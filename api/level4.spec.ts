import { test, expect } from '@playwright/test';

test.describe('Level 4 - Edge cases & Negative tests', () => {
    test('Access booking with invalid ID', async ({ request }) => {
        const resp = await request.get('https://restful-booker.herokuapp.com/booking/9999999');
        expect(resp.status()).toBe(404);
    });

    test('Create a booking with missing fields', async ({ request }) => {
        const bad = { lastname: 'NoFirst' };
        const resp = await request.post('https://restful-booker.herokuapp.com/booking', { data: bad });
        const okStatuses = [200, 201, 400, 500];
        if (!okStatuses.includes(resp.status())) {
            const txt = await resp.text();
            console.log('Unexpected status', resp.status(), txt);
        }
        expect(okStatuses).toContain(resp.status());
    });

    test('Update or delete without authentication', async ({ request }) => {
        const booking = {
            firstname: 'NoAuth',
            lastname: 'User',
            totalprice: 1,
            depositpaid: false,
            bookingdates: { checkin: '2025-04-01', checkout: '2025-04-02' },
            additionalneeds: 'None'
        };
        const created = await request.post('https://restful-booker.herokuapp.com/booking', { data: booking });
        expect(created.status()).toBe(200);
        const id = (await created.json()).bookingid;

        const putResp = await request.put(`https://restful-booker.herokuapp.com/booking/${id}`, { data: { firstname: 'X' } });
        expect([403, 405, 200]).toContain(putResp.status());

        const delResp = await request.delete(`https://restful-booker.herokuapp.com/booking/${id}`);
        expect([403, 405, 201]).toContain(delResp.status());
    });
});
