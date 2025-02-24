chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get('interval', function(data) {
        if (data.interval) {
            chrome.alarms.create('sendDailyEmail', { periodInMinutes: data.interval });
        }
    });
});

chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === 'sendDailyEmail') {
        fetchWW2Facts();  // Fetch 5 random WW2 facts from the API
    }
});

function fetchWW2Facts() {
    // We will fetch 5 WW2 facts from the API
    const facts = [];

    // Make multiple requests to the API to get 5 facts
    for (let i = 0; i < 5; i++) {
        fetch('https://fact-generator.herokuapp.com/api/v1/facts/random?category=history&subcategory=world-war-ii')
            .then(response => response.json())
            .then(data => {
                facts.push(data.fact);
                if (facts.length === 5) {
                    sendEmail(facts);  // Once we have 5 facts, send the email
                }
            })
            .catch(error => {
                console.log('Error fetching WW2 fact:', error);
                facts.push("Sorry, we couldn't fetch a WW2 fact today.");
                if (facts.length === 5) {
                    sendEmail(facts);  // Send email with whatever facts we have
                }
            });
    }
}

function sendEmail(facts) {
    // Create the email body by joining the 5 facts
    let emailBody = "<p>Here are your random WW2 facts for today:</p>";
    emailBody += "<ul>";
    facts.forEach(fact => {
        emailBody += `<li><strong>${fact}</strong></li>`;
    });
    emailBody += "</ul>";

    let emailDetails = {
        to: 'recipient@example.com',  // This could be dynamically set
        subject: 'Your Daily Random WW2 Facts',
        body: emailBody  // Include the list of facts in the email body
    };

    // OAuth 2.0 and Gmail API logic to send the email (refer to Gmail API documentation)
    console.log("Email would be sent with the facts: ", facts);
}
