import { DiaryCreateInput, DiaryCreateOutput } from '@/core/diary/types';

export abstract class ICreateDiaryCaseAdapter {
  abstract execute(data: DiaryCreateInput): Promise<DiaryCreateOutput>;
}
