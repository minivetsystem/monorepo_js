import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Role, RoleDocument } from '../auth/schemas';
import { ProfileTab, ProfileTabDocument } from '../auth/schemas';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: Model<RoleDocument>,
    @InjectModel(ProfileTab.name)
    private profileTabModel: Model<ProfileTabDocument>,
  ) {}
  getData(): { message: string } {
    return { message: 'Welcome to exchange-api!' };
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
}
