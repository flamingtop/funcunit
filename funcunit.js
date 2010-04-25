load('steal/rhino/env.js');

(function(){
	Funcunit = function(){}
	Funcunit.runTest = function(pageLoc){
		var path = new java.io.File(".").getCanonicalPath();
		SeleniumDefaults.browserURL = "file:///"+path.replace("\\", "/")+"/"+pageLoc;
		Envjs(pageLoc, {
			scriptTypes: {
				"text/javascript": true,
				"text/envjs": true
			},
			fireLoad: true,
			logLevel: 2
		});
	}
	Funcunit.redirectOutputTo = function(path){
		java.lang.System.setOut(new java.io.PrintStream(
			new java.io.BufferedOutputStream(new java.io.FileOutputStream(path))));
	}
	Funcunit.emailFile = function(path){
		if (typeof javax.mail.Session.getDefaultInstance != "function") {
			print('usage: steal\\js -mail [arguments]')
			quit()
		}
		load('steal/email/email.js');
		var log = readFile(path);
		print(log)
		steal.Emailer.setup(EmailerDefaults);
		print('here')
		steal.Emailer.send(log)
	}

})();