import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Media } from '../entities';
import { MediaService } from './media.service';
import { mockFile, mockInvalidFile } from './media.mockdata';
import { unlinkSync } from 'fs';

const mockMediaRepository = () => ({
  create: jest.fn((mockMimeType: string) => {
    const mockFileType = mockMimeType.split('/')[1];
    const mockMedia = new Media(mockFileType);
    return mockMedia;
  }),
  save: jest.fn((file: Media) => file),
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
    unlinkSync(`apps/mull-api/uploads/undefined.jpeg`);
    unlinkSync(`apps/mull-api/uploads/zoro`);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create media', async () => {
    const returnedMedia = await service.create(mockFile.mimetype);
    expect(returnedMedia.mediaType).toEqual(mockFile.mimetype.split('/')[1]);
  });

  it('should create a file', async () => {
    const returnedPromise = await service.saveFile(mockFile);
    expect(returnedPromise).toEqual(true);
  });

  it('should not create an invalid file', async () => {
    return await service.saveFile(mockInvalidFile).catch((error) => {
      expect(error).toEqual(false);
    });
  });

  it('should rename a file', async () => {
    const mockFileType = mockFile.mimetype.split('/')[1];
    const mockRenameFileName = service.updateFilename(mockFile.filename, 0, mockFileType);
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
});