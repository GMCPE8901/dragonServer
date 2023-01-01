module.exports = (client, aliases, callback) => {
  if(typeof aliases === 'string') {
    aliases = [aliases];
  }
  client.on('messageCreate', (message) => {
    const { content } = message;
    const args = content.split(' ');
  
    aliases.forEach(alias => {
      if (content.startsWith(alias)) {
        const params = args.filter(p => p !== args[0]);
        console.log(`Running Command ${alias}`);
        callback(message, params);
        return;
      }
    })
  })
}
