$(function() {
    // Calendar size - will be calculated dynamically
    var e;
    
    // Current date variables - initialize with current date
    var currentDate = new Date();
    var t = currentDate.getFullYear();
    var n = currentDate.getMonth() + 1;
    var r = [];
    
    // Month names
    var i = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
    
    // Weekday names
    var s = [
        "Sunday", "Monday", "Tuesday", "Wednesday", 
        "Thursday", "Friday", "Saturday"
    ];
    
    // jQuery elements
    var u = $("#calendar");
    var a = u.find("#calendar_header");
    var f = u.find("#calendar_weekdays");
    var l = u.find("#calendar_content");
    
    // Initialize current date
    function b() {
        var e = new Date;
        t = e.getFullYear();
        n = e.getMonth() + 1;
    }
    
    // Get days in month
    function v(e, t) {
        return (new Date(e, t, 0)).getDate();
    }
    
    // Get day of week
    function m(e, t, n) {
        return (new Date(e, t - 1, n)).getDay();
    }
    
    // Format date string
    function y(e) {
        return e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate();
    }
    
    // Check if date is today
    function g(e) {
        return y(new Date) == y(e);
    }
    
    // Render calendar
    function c() {
        p(); // Render weekdays
        var e = h(); // Get days array
        var r = 0;
        var u = false;
        l.empty();
        
        // Add blank cells for days before month starts
        while (!u) {
            if (s[r] == e[0].weekday) {
                u = true;
            } else {
                l.append('<div class="blank"></div>');
                r++;
            }
        }
        
        // Add all day cells for the month
        for (var c = 0; c < e.length; c++) {
            var v = e[c].day;
            var m = g(new Date(t, n - 1, v)) ? '<div class="today">' : "<div>";
            l.append(m + "" + v + "</div>");
        }
        
        // Calculate total cells used so far
        var totalCellsUsed = r + e.length;
        // Calculate how many cells are in the last incomplete week (if any)
        var remainder = totalCellsUsed % 7;
        // Only add blank cells if the last week is incomplete
        if (remainder !== 0) {
            var blankCellsNeeded = 7 - remainder;
            for (var b = 0; b < blankCellsNeeded; b++) {
                l.append('<div class="blank"></div>');
            }
        }
        
        // Update header with month name and year
        a.find("h1").text(i[n - 1] + " " + t);
        d(); // Update dimensions
    }
    
    // Get array of days in current month
    function h() {
        var e = [];
        for (var r = 1; r < v(t, n) + 1; r++) {
            e.push({
                day: r,
                weekday: s[m(t, n, r)]
            });
        }
        return e;
    }
    
    // Render weekday headers
    function p() {
        f.empty();
        for (var e = 0; e < 7; e++) {
            f.append("<div>" + s[e].substring(0, 3) + "</div>");
        }
    }
    
    // Update calendar dimensions - now fully handled by CSS
    function d() {
        // Dimensions are now fully responsive via CSS
        // This function is kept for compatibility but does nothing
    }
    
    // Initialize - ensure current date is set
    b();
    c();
    
    // Update dimensions on window resize
    $(window).on("resize", function() {
        d();
    });
    
    // Navigation click handlers
    a.find('i[class^="icon-chevron"]').on("click", function() {
        var e = $(this);
        var r = function(e) {
            n = e == "next" ? n + 1 : n - 1;
            if (n < 1) {
                n = 12;
                t--;
            } else if (n > 12) {
                n = 1;
                t++;
            }
            c();
        };
        if (e.attr("class").indexOf("left") != -1) {
            r("previous");
        } else {
            r("next");
        }
    });
});
