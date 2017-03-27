const githubStatistic = function (repo, callback) {
    var xmlhttp = new XMLHttpRequest(),
        url = ["https://api.github.com"],
        useCallback = (typeof(callback) == "function");

    function handleResponse(response) {

        var details = {
            stars: 0,
            forks: 0
        };

        if (!(response instanceof Array)) {
            response = [response];
        } else {
            details.repos = response.length;
        }

        for (var item of response) {
            details.stars += parseInt(item.stargazers_count);
            details.forks += parseInt(item.forks_count);
        }

        return details;
    }

    repo = repo.split("/");

    if (repo.length === 1) {
        url.push("users", repo[0], "repos");
    } else {
        url.push("repos", repo[0], repo[1]);
    }

    if (useCallback) {
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                callback(handleResponse(JSON.parse(xmlhttp.responseText)));
            }
        }
    }

    xmlhttp.open("GET", url.join("/"), useCallback);
    xmlhttp.setRequestHeader("Accept", "application/vnd.github.v3+json");
    xmlhttp.send();

    if (!useCallback) {
        return handleResponse(JSON.parse(xmlhttp.responseText));
    }
};


$(document).ready(function(){
    $("pre").each(function(){
        $(this).addClass("prettyprint");
    });
});
/*
githubStatistic('asduser', function(data) {
    var sidebarUserDetails = $('.sidebar-user-details');
    sidebarUserDetails.find('.repos-value').html(data.repos);
    sidebarUserDetails.find('.stars-value').html(data.stars);
    sidebarUserDetails.find('.forks-value').html(data.forks);
});*/
