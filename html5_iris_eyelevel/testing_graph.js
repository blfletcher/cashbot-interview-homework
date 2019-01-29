function actual_hour() {
    time = 'hour';
    return calc_rev_by_time(time)
}

function actual_month() {
    time = 'day';
    return calc_rev_by_time(time)
}

function actual_year() {
    time = 'month';
    return calc_rev_by_time(time)
}

function calc_rev_by_time(time) {
    total_sum = 0;
    for (var i in jsonData[time]) {
        total_sum += jsonData[time][i]['estimatedrev'];
    }
    return total_sum;
}

function calc_test(dataset) {
    total_sum = 0;
    for (var i in dataset) {
        total_sum += dataset[i]['y'];
    }
    return total_sum;
}

function test_hour(dataset) {
    return calc_test(dataset)
}

function test_month(dataset) {
    return calc_test(dataset)
}

function test_year(dataset) {
    return calc_test(dataset)
}