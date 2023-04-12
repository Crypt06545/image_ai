const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  description: '🏓Check my ping!',
  run: async (client, interaction) => {
    let pembed = new EmbedBuilder()
      .setTitle("Pong!")
      .setColor('#2F3136')
      .setThumbnail('https://avatars.githubusercontent.com/u/75322830?v=4')
      .addFields({ name: '**Latency**', value: `\`\`\`ini\n[ ${Date.now() - interaction.createdTimestamp}ms ]\n\`\`\``, inline: true },
        { name: '**API Latency**', value: `\`\`\`ini\n[ ${Math.round(client.ws.ping)}ms ]\n\`\`\``, inline: true })
      .setTimestamp()
      .setFooter({
        text: `©️ Project Crypt0`,
        iconURL: ('https://avatars.githubusercontent.com/u/75322830?v=4')
      })
    interaction.reply({
      embeds: [pembed]
    });
  },
};



