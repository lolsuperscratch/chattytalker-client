const io = require('socket.io-client')
var ChattyTalker = {
   Client: function (name,uri) {
       this.uri = uri || 'https://chattytalker.glitch.me/'
       this.socket = io(this.uri)
       this.name = name || "Anonymous"
       this.send = function (message) {
           this.socket.emit('sendmessage',this.name,message)
       }
       this.sendImage = function (url) {
           this.socket.emit('sendmessage',this.name,'<img src="'+url+'">')
       }
       this.sendLink = function (url,content) {
           this.socket.emit('sendmessage',this.name,'<a href="'+url+'">'+content+'</a>')
       }
       this.sendAction = function (action,message) {
           if (action == "me") return this.socket.emit('sendmessage',this.name,'<i>'+this.name+' '+message+'</i>')
           if (action == "bold") return this.socket.emit('sendmessage',this.name,'<b>'+message+'</b>')
           if (action == "i") return this.socket.emit('sendmessage',this.name,'<i>'+message+'</i>')
           if (action == "note") return this.socket.emit('sendmessage',this.name,'Note: '+message)
           return console.error('[ChattyTalker] Invaild Action, use "me", "bold", "i", "note" for the action')
       }
       this.disconnect = function () {
          this.socket.disconnect()
       }
       
   },
   NameBot: function (name) {
      return name+" <b>[BOT]</b>"
   }
}
module.exports = ChattyTalker
