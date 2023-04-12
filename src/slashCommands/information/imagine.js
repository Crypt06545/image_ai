const { SlashCommandBuilder, EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    name: "imagine",
    description: "Generate art in your dreams!",
    options: [
        {
            name: "prompt",
            description: "Your prompt to generate the art",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client, interaction, args) => {
        await interaction.deferReply()
        const prompt = interaction.options.getString("prompt")

        const replicate = await import("node-replicate")

        const prediction = await replicate.default.model(
            "prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb",
        )
            .predict({
                prompt: prompt,
            })

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel(`Download`)
                    .setStyle(ButtonStyle.Link)
                    .setURL(`${prediction.output[0]}`)
                    .setEmoji('1083007659457912852'))

        const embed = new EmbedBuilder()
            .setTitle("**Your Prompt:**")
            .setDescription(`**${prompt}**`)
            .setImage(prediction.output[0])
            .setColor('#2f3136')
            .setFooter({
                text: `Requested by: ${interaction.user.username} | ©️ Project Razer `,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            })

        await interaction.editReply({ embeds: [embed], components: [row] })
    }
}
