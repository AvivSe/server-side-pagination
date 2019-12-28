import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {SongsModule} from './songs.module';
import {join} from 'path';
import {ServeStaticModule} from '@nestjs/serve-static';

@Module({
    imports: [MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING), SongsModule, ServeStaticModule.forRoot({
        rootPath: join(__dirname, 'frontend'),
        renderPath: '*',
    })],
    controllers: [],
    providers: [],
})
export class AppModule {
}
