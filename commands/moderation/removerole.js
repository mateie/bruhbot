exports.run = (client, message) => {
    if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply(':x:**Error:** I don\'t have the **Manage Roles** Permission');
    if(message.mentions.users.size === 0) return message.reply(':x: Please mention a user to remove the role from \n Example: `removerole @user Moderator`');
    let member = message.guild.member(message.mentions.users.first());
    if(!member) return message.reply(':x:**Error:** Couldn\'t find the user');
    let rname = message.content.split(' ').splice(2).join(' ');
    let role = message.guild.roles.cache.find(val => val.name === rname);
    if(!role) return message.reply(`:x: **Error:** ${rname} doesn't exist`);
    let botRolePos = message.guild.member(client.user).roles.highest.position;
    let rolePos = role.position;
    let userRolePos = message.member.roles.highest.position;
    if(userRolePos <= rolePos) return message.channel.send(':x:**Error:** failed to remove the role from the user because your role is lower than the specified role');
    if(botRolePos <= rolePos) return message.channel.send(`:x:**Error:** failed to remove the role from the user because my highest role is lower than the specified role`);
    member.roles.remove(role).catch(() => {
        return message.channel.send(':no_entry_sign: There was an error');
    });

    message.channel.send(`:white_check_mark: **${message.author.username}**, I've removed the **${role.name}** role from **${message.mentions.users.first().username}**`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rr'],
    permLevel: 2,
};

exports.help = {
    name: 'removerole',
    description: 'Removes a role. It\'s same as adding a role',
    usage: 'removerole',
};