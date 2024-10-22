import { DraftPlayer } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { EnrollmentEntity } from "../../enrollments/entities/enrollment.entity";

export class DraftPlayerEntity implements DraftPlayer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  draftId: number;

  @ApiProperty()
  enrollmentId: number;

  @ApiProperty()
  enrollment: EnrollmentEntity;
}
