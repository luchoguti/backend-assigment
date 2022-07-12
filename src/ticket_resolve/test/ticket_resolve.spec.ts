import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../../app.module';
import {CreateTicketResolveDto} from "../dto/create-ticket_resolve.dto";
import {CreateTicketDto} from "../../ticket/dto/create-ticket.dto";
import {CreateAgentDto} from "../../agent/dto/create-agent.dto";
import encodings from '../../../node_modules/iconv-lite/encodings';
import iconvLite  from '../../../node_modules/iconv-lite/lib';

async function testDataPost(app: INestApplication, agent_test: CreateAgentDto, ticketTest: CreateTicketDto, ticket_res_cre_test: CreateTicketResolveDto) {
    const agent = await request(app.getHttpServer())
        .post('/agent')
        .type('form')
        .send(agent_test)

    const ticket = await request(app.getHttpServer())
        .post('/ticket')
        .type('form')
        .send(ticketTest)

    const data = await request(app.getHttpServer())
        .post('/ticket-resolve')
        .type('form')
        .send({
            ...ticket_res_cre_test,
            id_ticket: ticket.body.id_ticket,
            id_agent: agent.body.id_agent
        })

    return data;
}

async function getTicketResolve(app: INestApplication) {
    return request(app.getHttpServer()).get('/ticket-resolve');
}

describe('Ticket Resolve Rest Api', () => {
    let app: INestApplication;
    const ticket_resolve_id = 10000;
    const ticket_res_cre_test :CreateTicketResolveDto = {
        description: "resolve ticket was success test.", id_agent: 0, id_ticket: 0
    }
    const ticketTest: CreateTicketDto = {
        description: "decription test",
        priority: "mean",
        title: "title test",
    }
    const agent_test: CreateAgentDto = {
        names: "Juan Miguel", state: true
    }
    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });
    describe('Test all end-points ticket resolve', () => {
        //in case that want to delete all rows before do the test
        /*beforeEach(async () => {
            const uncleared = await request(app.getHttpServer()).get('/ticket-resolve');
            await Promise.all(
                uncleared.body.map(async (ticket) => {
                    return request(app.getHttpServer()).delete(`/ticket-resolve/${ticket-resolve.id_ticket_resolve}`);
                }),
            );
        });*/
        describe('GET /ticket-resolve', () => {
            it('should respond with a 200 status code', async () => {
                const ticket_resolve = await getTicketResolve(app);
                expect(ticket_resolve.statusCode).toBe(200);
            });
            it('should respond with an array', async () => {
                const ticket_resolve = await getTicketResolve(app);
                expect(ticket_resolve.body).toEqual(expect.any(Array));
            });
            it('should respond length body one or more ', async () => {
                const ticket_resolve = await getTicketResolve(app);
                expect(ticket_resolve.body.length).toBeGreaterThanOrEqual(1);
            });
            it('should respond position body have to attribute id_ticket_resolve',async ()=>{
                const ticket_resolve = await getTicketResolve(app);
                expect(ticket_resolve.body[0]).toHaveProperty('id_ticket_resolve')
            })
            it('should respond with id_ticket_resolve equal empty why do not exist ticket resolve', async ()=>{
                const ticket_resolve = await request(app.getHttpServer()).get(`/ticket-resolve/${ticket_resolve_id}`);
                expect(ticket_resolve.body.id_ticket_resolve).toEqual("")
            })
        })
        describe('POST /ticket-resolve',()=>{
            it('should respond with a 201 status code',async ()=>{
                const data = await testDataPost(app, agent_test, ticketTest, ticket_res_cre_test);
                expect(data.statusCode).toBe(201)
            });
            it('should have a content-type: application/json in header', async ()=>{
                const data = await testDataPost(app, agent_test, ticketTest, ticket_res_cre_test);
                expect(data.header['content-type']).toEqual(expect.stringContaining("json"))
            });
            it('should respond with a ticket resolve id',async ()=>{
                const data = await testDataPost(app, agent_test, ticketTest, ticket_res_cre_test);
                expect(data.body).toHaveProperty('id_ticket_resolve');
            });
            it('should respond that ticket yet was resolve',async ()=>{
                const ticket_result = await request(app.getHttpServer()).get('/ticket');
                const ticket_result_filter = ticket_result.body.filter((data_tick_res)=>{
                    return data_tick_res.state === "result";
                });
                const agent = await request(app.getHttpServer())
                    .post('/agent')
                    .send(agent_test)
                const data = await request(app.getHttpServer())
                    .post('/ticket-resolve')
                    .send({
                        ...ticket_res_cre_test,
                        id_ticket: ticket_result_filter[0].id_ticket,
                        id_agent: agent.body.id_agent
                    })
                expect(data.statusCode).toBe(409)
                expect(data.body.message).toEqual("This ticket yet was resolve.")
            })
            /*it('should respond that ticket is result in his state',async ()=>{
                const data = await testDataPost(app, agent_test, ticketTest, ticket_res_cre_test);
                const ticket_state = await request(app.getHttpServer()).get(`/ticket/${data.body.id_ticket}`);
                expect(ticket_state.body.status).toBe("result");
            })*/
        })
        describe('PATCH /ticket-resolve/{id}',()=>{
            it('should respond with a 200 status code',async ()=>{
                const ticket_resolve = await request(app.getHttpServer()).get('/ticket-resolve');
                const data = await request(app.getHttpServer())
                    .patch(`/ticket-resolve/${ticket_resolve.body[0].id_ticket_resolve}`)
                    .send({
                        ...ticket_res_cre_test,
                        id_ticket: ticket_resolve.body[0].id_ticket,
                        id_agent: ticket_resolve.body[0].id_agent
                    })
                expect(data.statusCode).toBe(200)
            });
            it('should respond that agent does not exist and status 409',async ()=>{
                const data = await request(app.getHttpServer())
                    .patch(`/agent/${ticket_resolve_id}`)
                    .send(ticket_res_cre_test)
                expect(data.statusCode).toBe(409)
                expect(data.body.message).toEqual("This agent does not exist")
            })
        })
    })
})