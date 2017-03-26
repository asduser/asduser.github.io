/* Works */
var worksData = {
    "Categories": [
        {
            "title": "Batch, Shell, WSH",
            "description": "",
            "items": [
                {
                    "title": "Easy Backup",
                    "technology": "batch-scripting",
                    "description": "Simple tool to create folders\\files backup inside your PC. It may be really helpful when you often need copy a specific folder\\files but you dont want do it manually due to time wasting.",
                    "demoUrl": "",
                    "sourceUrl": "https://github.com/asduser/bat-scripts-kit"
                },
                {
                    "title": "Logs Cleaner",
                    "technology": "Windows Script Host, batch-scripting",
                    "description": "Fast utility on WSH in order to clear logs after scheduled system or user operations.",
                    "demoUrl": "",
                    "sourceUrl": "https://github.com/asduser/wsh-logs-cleaner"
                },
                {
                    "title": "Password Generator",
                    "technology": "Windows Script Host, batch-scripting",
                    "description": "Flexible tool in configuration to generate passwords. The final result is written into the corresponding file. You may adjust a new options or edit existing in a special wsh file.",
                    "demoUrl": "",
                    "sourceUrl": "https://github.com/asduser/wsh-password-generator"
                }
            ]
        },
        {
            "title": "C# .NET",
            "description": "",
            "items": [
                {
                    "title": "CRUD-Authorize-App",
                    "technology": "ASP.NET MVC, EF, JS",
                    "description": "My first project on ASP.NET MVC to provide CRUD functionality into the HTML-tables. Also there are implemented a simple system of user authentication (ASP.NET Identity).",
                    "demoUrl": "",
                    "sourceUrl": "https://github.com/asduser/CRUD-Authorize-App"
                },
                {
                    "title": "Signalr ASP.NET Chat",
                    "technology": "ASP.NET MVC, EF, SignalR, JS",
                    "description": "Familiarization with SignalR and using it with ASP.NET MVC. As a result - fast and scalable chat, which may be changed depend on your preferences.",
                    "demoUrl": "",
                    "sourceUrl": "https://github.com/asduser/signalr-asp-chat"
                }
            ]
        },
        {
            "title": "JavaScript \\ TypeScript",
            "description": "",
            "items": [
                {
                    "title": "Form Validator",
                    "technology": "Angular.js",
                    "description": "A special directive to manage the HTML-forms.",
                    "demoUrl": "",
                    "sourceUrl": "https://github.com/asduser/form-validator"
                },
                {
                    "title": "UI Notifications",
                    "technology": "Angular.js",
                    "description": "Angular.js service to work with user notifications.",
                    "demoUrl": "",
                    "sourceUrl": "https://github.com/asduser/ui-notifications"
                },
                {
                    "title": "Storage Manager",
                    "technology": "Angular.js",
                    "description": "Specific scalable tool to manage the saved data on client-side (localStorage, cookies, sessionStorage, webSQL etc.) It will be helpful for you if application has the often changing local data.",
                    "demoUrl": "",
                    "sourceUrl": "https://github.com/asduser/storage-manager-anguarljs"
                },
                {
                    "title": "WebApi manager",
                    "technology": "Angular.js",
                    "description": "webApi client-side manager with a custom request optimizations to simplification the interconnection between client and server.",
                    "demoUrl": "",
                    "sourceUrl": "https://github.com/asduser/webApi-angularjs"
                },
                {
                    "title": "UI Local DB",
                    "technology": "Angular.js",
                    "description": "Fast and helpful library to work with data. Based on the methods of CRUD, so you may use it as instrument to obtain, adjust and modify different data inside your application.",
                    "demoUrl": "",
                    "sourceUrl": "https://github.com/asduser/ui-local-db"
                },
                {
                    "title": "qConvert",
                    "technology": "Angular.js",
                    "description": "That tool will be helpful for devs who often use a different conversion operations with data inside app (replace, invoke, shuffle etc.) Library has truly a small size and periodically some function structures are changing to improve the common performance.",
                    "demoUrl": "",
                    "sourceUrl": "https://github.com/asduser/qConvert-javascript-library"
                },
                {
                    "title": "RSS Reader",
                    "technology": "Angular.js",
                    "description": "Easy to understand tool, by which you may reed you favorites rss or use it as a site widget.",
                    "demoUrl": "",
                    "sourceUrl": "https://github.com/asduser/rss-reader"
                },
                {
                    "title": "Arkanoid",
                    "technology": "Angular.js",
                    "description": "Famous game with the possibility of further expansion via Angular.js. Purpose: ruin all bricks in round to finish successfully.",
                    "demoUrl": "",
                    "sourceUrl": "angularjs-arkanoid-game"
                },
                {
                    "title": "Running Boy",
                    "technology": "Angular.js",
                    "description": "This is my first experience in Javascript\\Canvas game-development. It is a simple keyboard tutor to improve your personal typing skills. There are only one level, but you may adjust a list of settings and dynamically apply it inside application. Enjoy yourself!",
                    "demoUrl": "",
                    "sourceUrl": "https://github.com/asduser/running-boy-keyboard"
                },
                {
                    "title": "Memory Game",
                    "technology": "Angular.js",
                    "description": "Simple game on Javascript when your primary goal is on finding two equal items for some time. Each result will be saved into the statistic table during current session.",
                    "demoUrl": "",
                    "sourceUrl": "https://github.com/asduser/angularjs-simple-game"
                }
            ]
        }
    ]
};

function generateWorkItems(data) {
    console.log(data);
    var worksPage = $('.works-page');
    var totalItems = 0;
    data.Categories.forEach(function(cat){
        var title = $('<h2 style="color:#9C4C17;cursor: pointer;" onclick="toggleItemsVisibility(this)">'+ cat.title +'<i class="fa fa-plus-circle" style="margin:0 0 0 10px;" aria-hidden="true"></i></h2>');
        var list = $('<ol style="display: none;">');
        cat.items.forEach(function(item){
            var li = $('<li><h4><a href="'+ item.sourceUrl +'" target="_blank">'+ generateItemTitle(item) +'</a></h4></li>');
            var liDescription = $('<ul style="margin:5px 0 0 0;list-style-type: none;"><li><blockquote>'+ generateItemContent(item) +'</blockquote></li></ul>');
            li.append(liDescription);
            list.append(li);
            totalItems++;
        });
        worksPage.append(title);
        worksPage.append(list);
    });
    $('.works-page-total').text(totalItems);
}

function toggleItemsVisibility(elem) {
    $(elem).find('i.fa').toggleClass('fa-minus-circle');
    $(elem).next().toggle();
}

function generateItemTitle(item){
    var result = "";
    result += item.title;
    if (item.demoUrl) {
        result += " | <a href='"+ item.demoUrl +"' target='_blank'>Demo<a/>";
    }
    return result;
}

function generateItemContent(item){
    var result = "";
    result += item.description;
    return result;
}

generateWorkItems(worksData);