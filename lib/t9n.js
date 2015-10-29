// forked from: https://raw.githubusercontent.com/softwarerero/meteor-accounts-t9n/master/t9n.coffee


T9n = {
  maps: {},
  defaultLanguage: 'en',
  language: '',
  dep: new Deps.Dependency(),
  depLanguage: new Deps.Dependency(),
  missingPrefix: ">",
  missingPostfix: "<",

  map: function(language, map){
    if(!this.maps[language]){
      this.maps[language] = {};
    }

    this.registerMap(language, '', false, map);

    return this.dep.changed();
  },

  get: function(label, markIfMissing, args){
    args = args || {};
    this.dep.depend();
    this.depLanguage.depend();
    var ret = '';

    if (typeof label != 'string'){
      return ret;
    }

    if (this.maps[this.language] !== undefined && this.maps[this.language][label]){
      ret = this.maps[this.language][label];
    } else if (this.maps[this.defaultLanguage] !== undefined && this.maps[this.defaultLanguage][label]){
      ret = this.maps[this.defaultLanguage][label];
    }else{
      ret = markIfMissing ? this.missingPrefix + label + this.missingPostfix : label;
    }

    if (Object.keys(args).length == 0){
      return ret;
    } else {
      return this.replaceParams(ret, args);
    }
  },

  registerMap: function(language, prefix, dot, map){
    if (typeof map == 'string'){
      this.maps[language][prefix] = map;
    } else if (typeof map == 'object'){
      if (dot){
        prefix = prefix + '.';
      }

      for (key in map){
        this.registerMap(language, prefix + key, true, map[key]);
      }
    }
  },

  getLanguage: function(){
    this.depLanguage.depend();

    return this.language;
  },

  getLanguages: function(){
    this.dep.depend();

    return Object.keys(this.maps).sort()
  },

  setLanguage: function(language){
    if(!this.maps[language] || this.language == language){
      return;
    }

    this.language = language;

    return this.depLanguage.changed();
  },

  replaceParams: function(str, args){
    for (key in args){
      re = new RegExp("@{" + key + "}", 'g');
      str = str.replace(re, args[key]);
    }

    return str;
  }
}

t9n = function (label, markIfMissing, args){
  return T9n.get(label, markIfMissing, args);
}
