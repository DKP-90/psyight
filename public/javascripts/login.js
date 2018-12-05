var connection = require('../javascripts/connection');

 function login (email,password,callback)
{
let login_return=false;
    let con = connection.mysql.createConnection({host : connection.host,user :connection.user,password : connection.password});

    con.connect(function(err) {
        try{
        if (err) throw err;
        con.query("SELECT username FROM psyight_dashboard.user_login WHERE username='" + email.toString() + "' AND password='" + password.toString() + "' LIMIT 1", function (err, result) {
            if (err) throw err;
            if (result.length)
                login_return = true;
            console.log(result);
            callback(login_return);
        });

        con.end();
    }catch(err){callback(err);}
    });
}
function register (user_name,password,email,organization,callback)
{
    let con = connection.mysql.createConnection({host : connection.host,user :connection.user,password : connection.password});
    let query_exec=false;
    con.connect(function(err) {
        try{
            if (err) throw err;
            con.query("INSERT INTO psyight_dashboard.user_login (`username`,`password`,`email`,`organization`) VALUES ('" + user_name.toString() + "','" + password.toString() + "','" + email.toString() + "','" + organization.toString() + "')", function (err, result) {
                if (err)
                    throw err;
                else
                    query_exec = true;
                console.log(result);
                callback(query_exec);
            });

            con.end();
        }catch(err){callback(err);}
    });
}

module.exports.login=login;
module.exports.register=register;