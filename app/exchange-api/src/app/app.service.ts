import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model, Connection } from 'mongoose';
import { Entity, EntityDocument, EntitySetting, EntitySettingDocument, ProfileTab, ProfileTabDocument, Role, RoleDocument } from '../auth/schemas';
import { LeadType, LeadTypeDocument } from '../verticals/autoinsurance/schemas';

/**
 * This is the app service which handles all the general apis for the app.
 */
@Injectable()
export class AppService {
  /**
   * Constructor for the app service.
   * @param connection Connection for mongoose to mongodb.
   * @param leadTypeModel This represents the field model.
   * @param configService This represents the config service instance.
   */
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectModel(Role.name)
    private roleModel: Model<RoleDocument>,
    @InjectModel(Entity.name)
    private entityModel: Model<EntityDocument>,
    @InjectModel(EntitySetting.name)
    private entitySettingModel: Model<EntitySettingDocument>,
    @InjectModel(ProfileTab.name)
    private profileTabModel: Model<ProfileTabDocument>,
    @InjectModel(LeadType.name)
    private leadTypeModel: Model<LeadTypeDocument>,
    private configService: ConfigService
  ) {}

  async fetchAllLeadTypes(): Promise<LeadType[]> {
    const allLeadTypes = await this.leadTypeModel.find({ }).exec();

    return allLeadTypes;
  }

  async fetchAllRoles(): Promise<Role []> {
    const allRoles = await this.roleModel.find({ }).exec();

    return allRoles;
  }

  async fetchProfileTabsForRole(role_val: string): Promise<ProfileTab []> {
    const profileTabs = await this.profileTabModel.find({
       role: role_val
    })
    .populate({ path: 'settings', populate: { path: 'setting' }, options: { sort: { 'index': 1 } }})
    .exec();

    if(!profileTabs) {
      throw new Error(`No profile tabs defined for the role ${role_val}`);
    }

    return profileTabs;
  }

  async fetchRoleSettings(role_val: string): Promise<EntitySetting []> {

    const allRoles = await Promise.all(role_val.split(',').map(async (val) => {
      const role = await this.roleModel.findById(val).exec();

      if(!role) {
        throw new Error(`No role found with the id ${val}`);
      }

      return role._id;
    }));

    const filter = {'rolesettings.roles._id': {$in: allRoles}  };

     const settings = await this.entitySettingModel.aggregate([
        { 
          $lookup : {
            from : 'rolesettings',
            localField : '_id',
            foreignField : 'entitysetting',
            as : 'rolesettings'
          }
       },
       {
        $unwind: {
            path: "$rolesettings",
            preserveNullAndEmptyArrays: true
        }
       },
       { 
          $lookup : {
            from : 'roles',
            localField : 'rolesettings.roles',
            foreignField : '_id',
            as : 'rolesettings.roles'
          }
        },
        { $match: filter },
        { 
        $project : { 
          _id : 1,
          entity : 1,
          name : 1,
          display_name : 1,
          datatype: 1,
          'rolesettings._id': 1,
          'rolesettings.roles': 1
        },
      }]);

      return settings;


  }
}
