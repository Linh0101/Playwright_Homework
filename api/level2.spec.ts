import { test, expect } from '@playwright/test';

test.describe('Level 2 - POST and Auth', () => {
    test('Create a new booking (POST /booking)', async ({ request }) => {
        const booking = {
            firstname: 'John',
            lastname: 'Smith',
            totalprice: 123,
            depositpaid: true,
            bookingdates: { checkin: '2025-01-01', checkout: '2025-01-05' },
            additionalneeds: 'Breakfast'
        };

        const resp = await request.post('https://restful-booker.herokuapp.com/booking', { data: booking });
        expect(resp.status()).toBe(200);
        const body = await resp.json();
        expect(body).toHaveProperty('bookingid');
    });

    test('Create auth token (POST /auth)', async ({ request }) => {
        const creds = { username: 'admin', password: 'password123' };
        const resp = await request.post('https://restful-booker.herokuapp.com/auth', { data: creds });
        expect(resp.status()).toBe(200);
        const body = await resp.json();
        expect(body).toHaveProperty('token');
    });
});
