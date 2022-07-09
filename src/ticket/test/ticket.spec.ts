import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import {CreateTicketDto} from "../dto/create-ticket.dto";
import {TicketInterface} from "../interfaces/ticket.interface";

describe('Ticket Services', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });
    describe('Test all end-points ticket',()=>{
        /*beforeEach(async () => {
            const uncleared = await request(app.getHttpServer()).get('/ticket');
            await Promise.all(
                uncleared.body.map(async (ticket) => {
                    return request(app.getHttpServer()).delete(`/ticket/${ticket.id_ticket}`);
                }),
            );
        });*/
        const createTicketTestDto: CreateTicketDto = {
            title: "test title",
            description: "description title",
            priority: "low"
        }
        const ticketTestInterface: TicketInterface = {
            created_at: undefined,
            description: "",
            id_agent: 0,
            id_ticket: 0,
            priority: undefined,
            state: undefined,
            title: "",
            update_at: undefined
        }
        describe('POST /ticket',()=>{
            it('should respond with a 201 status code',async ()=>{
                const data = await request(app.getHttpServer())
                    .post('/ticket')
                    .send(createTicketTestDto)
                expect(data.statusCode).toBe(201)
            });
            it('should have a content-type: application/json in header', async ()=>{
                const data = await request(app.getHttpServer())
                    .post('/ticket')
                    .send(createTicketTestDto)
                expect(data.header['content-type']).toEqual(expect.stringContaining("json"))
            });
            it('should respond with a ticket Id',async ()=>{
                const data = await request(app.getHttpServer())
                    .post('/ticket')
                    .send(createTicketTestDto)
                expect(data.body.id_ticket).toBeDefined();
            });
        })
        describe('GET /ticket',()=>{
            it('should respond with a 200 status code', async () => {
                const ticket = await request(app.getHttpServer()).get('/ticket');
                expect(ticket.statusCode).toBe(200);
            });
            it('should respond with an array', async () => {
                const ticket = await request(app.getHttpServer()).get('/ticket');
                expect(ticket.body).toEqual(expect.any(Array));
            });
            it('should respond length body one or more ', async () => {
                const ticket = await request(app.getHttpServer()).get('/ticket');
                expect(ticket.body[0].length).toBe(1);
            });
            it('should respond a body equal a interfaceTicket',async ()=>{
                const ticket = await request(app.getHttpServer()).get('/ticket');
                console.log(ticket.body);
                expect(ticket.body[0]).toEqual({
                    ...ticketTestInterface
                });
            })
        });
    })
    afterAll(async ()=>{
        await app.close();
    });
});
