async function testWebhook() {
    const url = "https://srinisanth.app.n8n.cloud/webhook-test/smartmeet-schedule";
    const payload = {
        meeting_title: "SmartMeet Integration Test",
        meeting_date: "2026-03-07",
        meeting_time: "10:30 AM",
        meeting_link: "http://localhost:3000/meet/mi5p8clh",
        participants_emails: ["srinirj2006@gmail.com"]
    };

    try {
        console.log(`Sending Webhook to: ${url}`);
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const text = await res.text();
        console.log(`Response Status: ${res.status}`);
        console.log(`Response Body: ${text}`);
    } catch (err) {
        console.error(`Error sending Webhook: ${err.message}`);
    }
}

testWebhook();
