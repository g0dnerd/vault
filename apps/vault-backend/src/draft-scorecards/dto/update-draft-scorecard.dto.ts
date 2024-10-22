import { PartialType } from '@nestjs/swagger';
import { CreateDraftScorecardDto } from './create-draft-scorecard.dto';

export class UpdateDraftScorecardDto extends PartialType(
  CreateDraftScorecardDto
) {}
