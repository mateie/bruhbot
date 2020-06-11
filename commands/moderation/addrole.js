exports.run = (client, message) => {
    if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply(':x: **Error:** I don\'t the **Manage Roles** Permission');
    if(message.mentions.users.size === 0) return message.reply(':x: Please mention a user to give the role to. \n Example: addrole @user');
    let member = message.guild.memeber(message.mentions.users.first());
    if(!member) return message.reply(':x: **Error:** That user doesn\'t exist');
    let rname = message.content.split(' ').splice(2).join(' ');
    let role = message.guild.roles.cache.find(val => val.name === rname);
    if(!role) return message.reply(`:x: **Error:** ${rname} isn't a role on this server`);
    let botRolePos = message.guild.member(client.user).roles.highest.position;
    let rolePos = role.position;
    let userRolePos = message.member.roles.highest.position;
    if(userRolePos <= rolePos) return message.channel.send(':x: **Error:** Failed to add the role to the user because your role is lowe than the specified role');
    if(botRolePos <= rolePos) return message.channel.send(':x: **Error:** Failed to asdd the role to the user because my highest role is lower that the specified role');
    member.roles.add(role).catch(e => {
        return message.channel.send(`:x: **Error:**\n${e}`);
    });
    message.channel.send(`:white_check_mark: **${message.author.username}**, I've added the **${rname}** role to **${message.mentions.users.first().username}**`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['promote'],
    permLevel: 2,
};

exports.help = {
    name: 'addrole',
    description: 'Adds a role to a user',
    usage: 'addrole [mention] [role name (do\'t mention the role)]',
};