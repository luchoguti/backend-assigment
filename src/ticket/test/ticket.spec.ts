import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../../app.module';
import {CreateTicketDto} from "../dto/create-ticket.dto";

async function testDataPostTicket(app: INestApplication, ticketTest: CreateTicketDto) {
    const data = await request(app.getHttpServer())
        .post('/ticket')
        .send(ticketTest)
    return data;
}

async function testDataGetTicket(app: INestApplication) {
    const ticket = await request(app.getHttpServer()).get('/ticket');
    return ticket;
}

describe('Ticket Rest Api', () => {
    let app: INestApplication;
    const ticket_id = 10000;
    const createTicketTestDto: CreateTicketDto = {
        title: "test title",
        description: "description title",
        priority: "low"
    }
    const ticketTest: CreateTicketDto = {
        description: "title test",
        priority: "low",
        title: "description test",
    }

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });
    describe('Test all end-points ticket', () => {
        //in case that want to delete all rows before do the test
        /*beforeEach(async () => {
            const uncleared = await request(app.getHttpServer()).get('/ticket');
            await Promise.all(
                uncleared.body.map(async (ticket) => {
                    return request(app.getHttpServer()).delete(`/ticket/${ticket.id_ticket}`);
                }),
            );
        });*/

        describe('POST /ticket', () => {
            it('should respond with a 201 status code', async () => {
                const data = await testDataPostTicket(app, ticketTest);
                expect(data.statusCode).toBe(201)
            });
            it('should have a content-type: application/json in header', async () => {
                const data = await testDataPostTicket(app, ticketTest);
                expect(data.header['content-type']).toEqual(expect.stringContaining("json"))
            });
            it('should respond with a ticket Id', async () => {
                const data = await testDataPostTicket(app, ticketTest);
                expect(data.body).toHaveProperty('id_ticket');
            });
        })
        describe('GET /ticket', () => {
            it('should respond with a 200 status code', async () => {
                const ticket = await testDataGetTicket(app);
                expect(ticket.statusCode).toBe(200);
            });
            it('should respond with an array', async () => {
                const ticket = await testDataGetTicket(app);
                expect(ticket.body).toEqual(expect.any(Array));
            });
            it('should respond length body one or more ', async () => {
                const ticket = await testDataGetTicket(app);
                expect(ticket.body.length).toBeGreaterThanOrEqual(1);
            });
            it('should respond position body have to attribute title', async () => {
                const ticket = await testDataGetTicket(app);
                expect(ticket.body[0]).toHaveProperty('title')
            })
        });
        describe('PATCH /ticket/{id}', () => {
            it('should respond with a 200 status code', async () => {
                const ticket = await request(app.getHttpServer()).get('/ticket');
                const data = await request(app.getHttpServer())
                    .patch(`/ticket/${ticket.body[0].id_ticket}`)
                    .send(ticketTest)
                expect(data.statusCode).toBe(200)
            });
            it('should respond that ticket does not exist and status 409', async () => {
                const data = await request(app.getHttpServer())
                    .patch(`/ticket/${ticket_id}`)
                    .send(ticketTest)
                expect(data.statusCode).toBe(409)
                expect(data.body.message).toEqual("This ticket does not exist")
            })
        })
        describe('DELETE /ticket/{id}', () => {
            it('should respond with a 200 status code', async () => {
                const ticket = await request(app.getHttpServer()).get('/ticket');
                const data = await request(app.getHttpServer())
                    .delete(`/ticket/${ticket.body[0].id_ticket}`)
                expect(data.statusCode).toBe(200)
            });
            it('should respond that ticket does not exist and status 409', async () => {
                const data = await request(app.getHttpServer())
                    .delete(`/ticket/${ticket_id}`)
                expect(data.statusCode).toBe(409)
                expect(data.body.message).toEqual("This ticket does not exist.")
            })
        })
    })
    afterAll(async () => {
        await app.close();
    });
});
