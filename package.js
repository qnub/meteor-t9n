Package.describe({
  summary: "Almost i18n, with standard translations for basic meteor packages.",
  version: "0.0.2",
  name: "qnub:t9n",
  git: "https://github.com/qnub/meteor-t9n.git",
});

DEFAULT_LANGUAGES = ['en'];

LANGUAGES = DEFAULT_LANGUAGES;

if(process.env.T9N_LANGUAGES) {
  LANGUAGES = process.env.T9N_LANGUAGES.split(',');
}

Package.on_use(function (api, where) {
  if (api.versionsFrom){
    api.versionsFrom("METEOR@0.9.0");
  }

  api.add_files([
    'lib/t9n.js'
  ]);

  api.use([
    'deps'
  ]);

  api.export(['T9n', 't9n']);
});
