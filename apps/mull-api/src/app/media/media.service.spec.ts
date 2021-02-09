import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { unlinkSync } from 'fs';
import { Media } from '../entities';
import {
  mockAllMedias,
  mockFileJPEG,
  mockFilePNG,
  mockInvalidFile,
  mockMediaInput,
} from './media.mockdata';
import { MediaService } from './media.service';

const mockMediaRepository = () => ({
  findOne: jest.fn((id: number) => mockAllMedias[id - 1]),
  save: jest.fn((file: Media) => {
    file.id = file.mediaType == 'jpeg' ? 1 : 2;
    file.post = null;
    return file;
  }),
  update: jest.fn((id: number) => {
    return { id: id, mediaType: id == 2 ? 'jpeg' : 'png', post: null };
  }),
});

describe('MediaService', () => {
  let service: MediaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaService,
        {
          provide: getRepositoryToken(Media),
          useFactory: mockMediaRepository,
        },
      ],
    }).compile();

    service = module.get<MediaService>(MediaService);
  });

  afterAll(() => {
    unlinkSync(`apps/mull-api/uploads/0.jpeg`);
    unlinkSync(`apps/mull-api/uploads/1.jpeg`);
    unlinkSync(`apps/mull-api/uploads/2.png`);
    unlinkSync(`apps/mull-api/uploads/2.jpeg`);
    unlinkSync(`apps/mull-api/uploads/undefined.jpeg`);
    unlinkSync(`apps/mull-api/uploads/zoro.jpeg`);
    unlinkSync(`apps/mull-api/uploads/luffy.png`);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload a file', async () => {
    const mockUploadedFile = await service.uploadFile(mockFileJPEG);
    expect(mockUploadedFile).toEqual(mockAllMedias[0]);
  });

  it('should not upload an invalid file', async () => {
    await expect(() => service.uploadFile(mockInvalidFile)).rejects.toThrow(
      InternalServerErrorException
    );
  });

  it('should create media', async () => {
    const returnedMedia = await service.createMedia(mockFileJPEG.mimetype);
    expect(returnedMedia.mediaType).toEqual(mockFileJPEG.mimetype.split('/')[1]);
  });

  it('should create a file', async () => {
    const returnedPromise = await service.saveFile(mockFileJPEG);
    expect(returnedPromise).toEqual(true);
  });

  it('should not create an invalid file', async () => {
    return await service.saveFile(mockInvalidFile).catch((error) => {
      expect(error).toEqual(false);
    });
  });

  it('should rename a file', async () => {
    const mockFileType = mockFileJPEG.mimetype.split('/')[1];
    const mockRenameFileName = service.updateFilename(mockFileJPEG.filename, 0, mockFileType);
    expect(mockRenameFileName).toEqual(true);
  });

  it('should not rename a nonexistent file', async () => {
    try {
      const mockRenameFileName = service.updateFilename('error', 0, '');
      expect(mockRenameFileName).toEqual(true);
    } catch (err) {
      expect(err.syscall).toEqual('rename');
    }
  });

  it('should find an image', async () => {
    const foundMedia = await service.getMedia(1);
    expect(foundMedia).toEqual(mockAllMedias[0]);
  });

  it('should update a file', async () => {
    await service.uploadFile(mockFilePNG);
    const updatedFile = await service.updateFile(mockFileJPEG, mockMediaInput);
    expect(updatedFile).toEqual(mockAllMedias[1]);
  });

  it('should not update an invalid file', async () => {
    await expect(() => service.updateFile(mockInvalidFile, mockMediaInput)).rejects.toThrow(
      InternalServerErrorException
    );
  });
});
