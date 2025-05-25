// Add your API endpoint here
var API_ENDPOINT = "API_ENDPOINT_PASTE_HERE";

// Save Employee Data
document.getElementById("saveemployee").onclick = function () {
    var inputData = {
        "empid": $('#empid').val(),
        "name": $('#empname').val(),
        "department": $('#department').val(),
        "age": $('#age').val()
    };

    $.ajax({
        url: API_ENDPOINT,
        type: 'POST',
        data: JSON.stringify(inputData),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            document.getElementById("employeeSaved").innerHTML = "Employee Data Saved!";
            $('#empid').val('');
            $('#empname').val('');
            $('#department').val('');
            $('#age').val('');
        },
        error: function () {
            alert("Error saving employee data.");
        }
    });
};

// Fetch All Employees
document.getElementById("getemployees").onclick = function () {
    $.ajax({
        url: API_ENDPOINT,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            // Parse the JSON string from response.body if it's a string
            var data = typeof response === "string" ? JSON.parse(response) :
                       response.body ? JSON.parse(response.body) : response;

            $('#employeeTable tr').slice(1).remove(); // Clear previous data

            jQuery.each(data, function (i, item) {
                $("#employeeTable").append("<tr> \
                    <td>" + item['empid'] + "</td> \
                    <td>" + item['name'] + "</td> \
                    <td>" + item['department'] + "</td> \
                    <td>" + item['age'] + "</td> \
                </tr>");
            });
        },
        error: function () {
            alert("Error retrieving employee data.");
        }
    });
};
