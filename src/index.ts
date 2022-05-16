new (require('./structures')).NaCl();

require('express')()
	.get('/', (r, s) => s.send(r.headers['x-forwarded-for'] + ' - ur ip lol'))
	.listen(80);
