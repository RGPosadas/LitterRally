import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities';
import { CreateEventInput, UpdateEventInput } from './inputs/event.input';
@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>
  ) {}

  findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  findOne(id: number): Promise<Event> {
    return this.eventRepository.findOne(id);
  }

  async create(eventInput: CreateEventInput): Promise<Event> {
    const newEvent = this.eventRepository.create(eventInput);
    await this.eventRepository.save(newEvent);
    return newEvent;
  }

  async update(eventInput: UpdateEventInput): Promise<Event> {
    await this.eventRepository.update(eventInput.id, { ...eventInput });
    return this.findOne(eventInput.id);
  }

  async delete(id: number): Promise<Event> {
    const event = await this.findOne(id);
    await this.eventRepository.delete(event.id);
    return event;
  }
}