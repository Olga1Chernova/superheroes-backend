const express = require('express');
const request = require('supertest');
const { expect } = require('chai');
const { describe, it } = require('mocha');

const app = express();
const router = require('./superheroes-routes');

app.use('/', router);

describe('Superheroes API', () => {
  it('should return all superheroes', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('should return a superhero by ID', async () => {
    const response = await request(app).get('/64765dbb668907945af55ced');
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it('should add a new superhero', async () => {
    const newSuperhero = {
        "nickname": "Captain America",
        "real_name": "Steve Rogers",
        "origin_description": "Steve Rogers, a frail young man, was transformed into a super-soldier known as Captain America, thanks to a top-secret government experiment.",
        "superpowers": [
        "Enhanced strength",
        "Enhanced agility",
        "Indomitable willpower"
        ],
        "catch_phrase": "I can do this all day.",
        "images": [
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.britannica.com%2F30%2F182830-050-96F2ED76%2FChris-Evans-title-character-Joe-Johnston-Captain.jpg&tbnid=Yw7m-2_zFKD_pM&vet=12ahUKEwiM-LSN7p3_AhVCuyoKHTN6Bz8QMygBegUIARC8AQ..i&imgrefurl=https%3A%2F%2Fwww.britannica.com%2Ftopic%2FCaptain-America&docid=EZagQfKw3VKfNM&w=1210&h=1600&q=capitan%20america&client=firefox-b-d&ved=2ahUKEwiM-LSN7p3_AhVCuyoKHTN6Bz8QMygBegUIARC8AQ"
  ]
    };

    const response = await request(app).post('/create').send(newSuperhero);
    expect(response.statusCode).to.equal(201);
    expect(response.body).to.be.an('object');
  });

  it('should delete a superhero by ID', async () => {
    const response = await request(app).delete('info/64765dbb668907945af55ced/delete'); 
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it('should update a superhero by ID', async () => {
    const updatedSuperhero = {
      "nickname": "Captain America",
        "real_name": "Steve Rogers",
        "origin_description": "Steve Rogers, a frail young man, was transformed into a super-soldier known as Captain America, thanks to a top-secret government experiment.",
        "superpowers": [
        "Enhanced strength",
        "Enhanced speed",
        "Indomitable willpower"
        ],
        "catch_phrase": "I can do this all day.",
        "images": [
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.britannica.com%2F30%2F182830-050-96F2ED76%2FChris-Evans-title-character-Joe-Johnston-Captain.jpg&tbnid=Yw7m-2_zFKD_pM&vet=12ahUKEwiM-LSN7p3_AhVCuyoKHTN6Bz8QMygBegUIARC8AQ..i&imgrefurl=https%3A%2F%2Fwww.britannica.com%2Ftopic%2FCaptain-America&docid=EZagQfKw3VKfNM&w=1210&h=1600&q=capitan%20america&client=firefox-b-d&ved=2ahUKEwiM-LSN7p3_AhVCuyoKHTN6Bz8QMygBegUIARC8AQ"]
    };

    const response = await request(app).put('info/64765dbb668907945af55ced/update').send(updatedSuperhero);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an('object');
  });
});
