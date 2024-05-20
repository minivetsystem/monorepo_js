import {
  Controller
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller('admins')
@ApiTags('admins')
export class AdminsController { }
