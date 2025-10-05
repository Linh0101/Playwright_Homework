import { test, expect } from '@playwright/test';

test.describe('Level 1 - Basic GET requests', () => {
    test('Get list of all bookings', async ({ request }) => {
        const resp = await request.get('https://restful-booker.herokuapp.com/booking');
        expect(resp.status()).toBe(200);
        const body = await resp.json();
        expect(Array.isArray(body)).toBeTruthy();
    });

    test('Get details of specific booking by id', async ({ request }) => {
        const id = 1;
        const resp = await request.get(`https://restful-booker.herokuapp.com/booking/${id}`);
        if (resp.status() === 200) {
            const body = await resp.json();
            expect(body).toHaveProperty('firstname');
        } else {
            expect(resp.status()).toBe(404);
        }
    });

    test('Search bookings by firstname and lastname', async ({ request }) => {
        const resp = await request.get('https://restful-booker.herokuapp.com/booking?firstname=Jim&lastname=Jones');
        expect([200, 201, 204, 404]).toContain(resp.status());
        const body = await resp.json();
        expect(Array.isArray(body)).toBeTruthy();
    });
});
