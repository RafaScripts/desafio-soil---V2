import {describe, expect, test} from '@jest/globals';
import {faker} from "@faker-js/faker";

describe('Users', () => {
    test('Create User', async () => {
        const data = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        const response = await fetch('http://localhost:3000/api/v1/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        expect(response.status).toBe(201);
    });
})