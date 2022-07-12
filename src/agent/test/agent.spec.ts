import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import {CreateAgentDto} from "../dto/create-agent.dto";
import {UpdateAgentDto} from "../dto/update-agent.dto";

async function testDataPostAgent(app: INestApplication, agent_test: CreateAgentDto) {
    const data = await request(app.getHttpServer())
        .post('/agent')
        .send(agent_test)
    return data;
}

async function testDataGetAgent(app: INestApplication) {
    const agent = await request(app.getHttpServer()).get('/agent');
    return agent;
}

describe('Agent Rest Api', () => {
    let app: INestApplication;
    const id_agent_test = 1000;
    const agent_test: CreateAgentDto = {
        names: "test agent my test", state: true
    }
    const agent_test_update: UpdateAgentDto ={
        names: "test agent my test update"
    }
    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });
    //in case that want to delete all rows before do the test
    /*beforeEach(async () => {
        const uncleared = await request(app.getHttpServer()).get('/agent');
        await Promise.all(
            uncleared.body.map(async (agent) => {
                return request(app.getHttpServer()).delete(`/agent/${agent.id_agent}`);
            }),
        );
    });*/
    describe('Test all end-points agent',()=> {
        describe('GET /agent',()=> {
            it('should respond with a 200 status code', async () => {
                const agent = await testDataGetAgent(app);
                expect(agent.statusCode).toBe(200);
            });
            it('should respond with an array', async () => {
                const agent = await testDataGetAgent(app);
                expect(agent.body).toEqual(expect.any(Array));
            });
            it('should respond length body one or more ', async () => {
                const agent = await testDataGetAgent(app);
                expect(agent.body.length).toBeGreaterThanOrEqual(1);
            });
            it('should respond position body have to attribute names',async ()=>{
                const agent = await testDataGetAgent(app);
                expect(agent.body[0]).toHaveProperty('names')
            })
            it('should respond with id_agent equal zero why do not exist agent', async ()=>{
                const agent = await request(app.getHttpServer()).get(`/agent/${id_agent_test}`);
                expect(agent.body.id_agent).toEqual(0)
            })
        })
        describe('POST /agent',()=>{
            it('should respond with a 201 status code',async ()=>{
                const data = await testDataPostAgent(app, agent_test);
                expect(data.statusCode).toBe(201)
            });
            it('should have a content-type: application/json in header', async ()=>{
                const data = await testDataPostAgent(app, agent_test);
                expect(data.header['content-type']).toEqual(expect.stringContaining("json"))
            });
            it('should respond with a agent id',async ()=>{
                const data = await testDataPostAgent(app, agent_test);
                expect(data.body).toHaveProperty('id_agent');
            });
        })
        describe('PATCH /agent/{id}',()=>{
            it('should respond with a 200 status code',async ()=>{
                const agent = await request(app.getHttpServer()).get('/ticket');
                const data = await request(app.getHttpServer())
                    .patch(`/agent/${agent.body[0].id_agent}`)
                    .send(agent_test_update)
                expect(data.statusCode).toBe(200)
            });
            it('should respond that agent does not exist and status 409',async ()=>{
                const data = await request(app.getHttpServer())
                    .patch(`/agent/${id_agent_test}`)
                    .send(agent_test_update)
                expect(data.statusCode).toBe(409)
                expect(data.body.message).toEqual("This agent does not exist")
            })
        })
        describe('DELETE /ticket/{id}', ()=>{
            it('should respond with a 200 status code',async ()=>{
                const agent = await request(app.getHttpServer()).get('/agent');
                const data = await request(app.getHttpServer())
                    .delete(`/agent/${agent.body[0].id_agent}`)
                expect(data.statusCode).toBe(200)
            })
            it('should respond that agent does not exist and status 409', async () => {
                const data = await request(app.getHttpServer())
                    .delete(`/agent/${id_agent_test}`)
                expect(data.statusCode).toBe(409)
                expect(data.body.message).toEqual("This agent does not exist.")
            })
        })
    })
})