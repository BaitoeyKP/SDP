import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe, Request, UnauthorizedException, Param, Patch } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from '../admin/dto/CreateAdmin.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Admin } from 'src/typeorm';


@Controller('admin/user')
export class AdminController {
    constructor(
        private readonly adminService: AdminService
    ) { }

    @Post('/register')
    @UsePipes(ValidationPipe)
    createNewAdmin(@Body() createAdminDto: CreateAdminDto) {
        return this.adminService.createAdmin(createAdminDto)

    }

    @Post('/login')
    AdminLogin(@Body('username') username: string, @Body('password') password: string) {
        console.log(username, password);

        const user = this.adminService.loginAdmin(username, password)
        return user;
    }


    @UseGuards(AuthGuard)
    @Get('getcode')
    async getAdminCode() {
        const code = await this.adminService.getCode();
        if (code === null) {

            return { error: 'Admin not found' };
        }
        return { code };
    }


    @UseGuards(AuthGuard)
    @Get('Expire')
    async getExpire() {
        const expire = await this.adminService.getExpire();
        if (expire === null) {

            return { error: 'Admin not found' };
        }
        return { expire };
    }

    @UseGuards(AuthGuard)
    @Patch('displayname/:name')
    async patchDisplayname(@Request() req, @Param('name') name: string): Promise<Admin> {
        return await this.adminService.patchDisplayname(req.user.uuid, name);
    }


    @UseGuards(AuthGuard)
    @Get('displayname')
    async getDisplayname(@Request() req): Promise<String> {
        return await this.adminService.getDisplayname(req.user.uuid);
    }
    @UseGuards(AuthGuard)
    @Patch('tel/:tel')
    async patchTel(@Request() req, @Param('tel') tel: string): Promise<Admin> {
        return await this.adminService.patchTel(req.user.uuid, tel);
    }

    @UseGuards(AuthGuard)
    @Get('QR')
    async getqr(@Request() req): Promise<{pic:string,tel:string}> {
        return await this.adminService.getQR(req.user.uuid);
    }


}


