import { PartialType } from '@nestjs/swagger';
import { CreateTicketResolveDto } from './create-ticket_resolve.dto';

export class UpdateTicketResolveDto extends PartialType(CreateTicketResolveDto) {}
