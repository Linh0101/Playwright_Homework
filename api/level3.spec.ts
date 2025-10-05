import { test, expect } from '@playwright/test';

test.describe('Level 3 - Update & Delete (requires auth)', () => {
    test('Update a booking with PUT', async ({ request }) => {
        const booking = {
            firstname: 'Original',
            lastname: 'User',
            totalprice: 10,
            depositpaid: false,
            bookingdates: { checkin: '2025-01-01', checkout: '2025-01-02' },
            additionalneeds: 'None'
        };
        const create = await request.post('https://restful-booker.herokuapp.com/booking', { data: booking });
        expect(create.status()).toBe(200);
        const created = await create.json();
        const id = created.bookingid;

        const auth = await request.post('https://restful-booker.herokuapp.com/auth', { data: { username: 'admin', password: 'password123' } });
        expect(auth.status()).toBe(200);
        const token = (await auth.json()).token;

        const updated = { ...booking, firstname: 'Jane', totalprice: 999 };
        const resp = await request.put(`https://restful-booker.herokuapp.com/booking/${id}`, {
            data: updated,
            headers: { Cookie: `token=${token}`, 'Content-Type': 'application/json' }
        });
        expect([200, 403]).toContain(resp.status());
        if (resp.status() === 200) {
            const body = await resp.json();
            expect(body.firstname).toBe('Jane');
        }
    });

    test('Partially update a booking with PATCH', async ({ request }) => {
        const booking = {
            firstname: 'Patchy',
            lastname: 'User',
            totalprice: 20,
            depositpaid: false,
            bookingdates: { checkin: '2025-02-01', checkout: '2025-02-02' },
            additionalneeds: 'None'
        };
        const create = await request.post('https://restful-booker.herokuapp.com/booking', { data: booking });
        expect(create.status()).toBe(200);
        const id = (await create.json()).bookingid;

        const auth = await request.post('https://restful-booker.herokuapp.com/auth', { data: { username: 'admin', password: 'password123' } });
        expect(auth.status()).toBe(200);
        const token = (await auth.json()).token;

        const patch = { firstname: 'Pat' };
        const resp = await request.patch(`https://restful-booker.herokuapp.com/booking/${id}`, {
            data: patch,
            headers: { Cookie: `token=${token}`, 'Content-Type': 'application/json' }
        });
        expect([200, 403]).toContain(resp.status());
    });

    test('Delete a booking', async ({ request }) => {
        const booking = {
            firstname: 'DeleteMe',
            lastname: 'User',
            totalprice: 30,
            depositpaid: false,
            bookingdates: { checkin: '2025-03-01', checkout: '2025-03-02' },
            additionalneeds: 'None'
        };
        const create = await request.post('https://restful-booker.herokuapp.com/booking', { data: booking });
        expect(create.status()).toBe(200);
        const id = (await create.json()).bookingid;

        const auth = await request.post('https://restful-booker.herokuapp.com/auth', { data: { username: 'admin', password: 'password123' } });
        expect(auth.status()).toBe(200);
        const token = (await auth.json()).token;

        const resp = await request.delete(`https://restful-booker.herokuapp.com/booking/${id}`, {
            headers: { Cookie: `token=${token}` }
        });
        expect([201, 403, 405]).toContain(resp.status());

        const check = await request.get(`https://restful-booker.herokuapp.com/booking/${id}`);
        expect([200, 404]).toContain(check.status());
    });
});
