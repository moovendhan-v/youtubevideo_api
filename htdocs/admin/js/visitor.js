var visitorsInfo = "http://localhost/htdocs/?getvisitorsinfo";

var visitorsInfoArray = [];
var emailsubscribers = [];
var contactMessage = [];

function createVisitorTableRow(visitor) {
    return `
        <tr>
            <td>${visitor.region}</td>
            <td><i class="fa-brands fa-firefox-browser"></i></td>
            <td>${visitor.time}</td>
            <td>${visitor.country}</td>
            <td>${visitor.timezone}</td>
            <td>${visitor.ip}</td>
        </tr>`;
}

function createEmailTable(email){
    return `
    <tr>
        <td>${email.email_details}</td>
    </tr>`;
}

function createMessageTable(message){
    return `<tr>
    <td>${message.email}</td>
    <td>${message.telegram_link}</td>
    <td>${message.message}</td>
  </tr>`;
}
class VisitorInfo {
    constructor({ city, country, id, ip, loc, region, time, timezone, user_agent }) {
        this.city = city;
        this.country = country;
        this.id = id;
        this.ip = ip;
        this.loc = loc;
        this.region = region;
        this.time = time;
        this.timezone = timezone;
        this.user_agent = user_agent;
    }
}

$.ajax({
    url: visitorsInfo,
    method: "GET",
    dataType: "json", 
    success: function (data) {

        $.each(data.visitor, function (index, visitor) {
            let visitorData = {
                city: visitor.city,
                country: visitor.country,
                id: visitor.id,
                ip: visitor.ip,
                loc: visitor.loc,
                region: visitor.region,
                time: visitor.time,
                timezone: visitor.timezone,
                user_agent: visitor.user_agent
            };
            visitorsInfoArray.push(visitorData);
            $('#visitorTable').append(createVisitorTableRow(visitorData));
        });

        $.each(data.emailsubscribers, function (index, subscribers) {
            emailsubscribers.push(subscribers);
            $('#subscribersTable').append(createEmailTable(subscribers));
        });

        $.each(data.contactmessage, function (index, message) {
            contactMessage.push(message);
            $('#contactTable').append(createMessageTable(message));
        });

        // $('.dashbordTodayVisitors').text(visitorsInfoArray.length);
        // $('.dashbordLastMontVisitors').text(visitorsInfoArray.length);
        $('.dashbordTotalSubscribers').text(emailsubscribers.length);
        $('.dashbordTotalVisitors').text(visitorsInfoArray.length);
    },
    error: function (xhr, status, error) {
        console.error("Error:", error);
    }
});
