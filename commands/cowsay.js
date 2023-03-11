const { SlashCommandBuilder } = require('discord.js');
const { codeBlock } = require("@discordjs/builders");
const { say, think } = require('../cowsay');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cowsay')
		.setDescription('Generate ASCII art picture with a message.')
		.addStringOption(option =>
			option.setName('art')
			.setDescription('Pick the ASCII art')
			.setRequired(true)
			.addChoices(...makeCowsayArtChoices()))
		.addStringOption(option =>
			option.setName('message')
			.setDescription('Write your message')
			.setRequired(true))
		.addBooleanOption(option =>
			option.setName('thinking')
			.setDescription('Use a thinking bubble instead of a speech bubble')),
	async execute(interaction) {
		const fn = interaction.options.getBoolean('thinking') ? think : say;

		const output = fn({
			text: interaction.options.getString('message'),
			f: interaction.options.getString('art'),
		});
		return interaction.reply(codeBlock(output));
	},
};

function makeCowsayArtChoices() {
	const names = [
		"walter",
		"bog",
	];

	return names.map(name => ({name: capitalize(name), value: name}));
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
