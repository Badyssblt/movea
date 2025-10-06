import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../common/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/users',
        filename: (req: any, file, callback) => {
          // on force ici le typage de req comme any ou un type étendu
          const userId = req.user?.id ?? 'unknown';
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `user-${userId}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error('Seules les images JPG/PNG sont autorisées !'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadUserAvatar(
    @UploadedFile() file: Express.Multer.File,
    @User() user: any,
  ) {
    if (!file) throw new Error('Aucun fichier reçu !');

    const updatedUser = await this.userService.updateUserAvatar(user.id, file.filename);

    return {
      message: 'Photo de profil mise à jour avec succès 🎉',
      user: updatedUser,
      imageUrl: `/uploads/users/${file.filename}`,
    };
  }
}
