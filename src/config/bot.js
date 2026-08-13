import { logger } from '../utils/logger.js';

export const botConfig = {
  // =========================
  // BOT PRESENCE (what users see under the bot name)
  // =========================
  // `status` options:
  // - "online"    = green dot
  // - "idle"      = yellow moon
  // - "dnd"       = red do-not-disturb
  // - "invisible" = appears offline
  presence: {
    // Current online state shown on Discord.
    status: "online",

    // Activity lines shown under the bot name.
    // `type` number mapping from Discord:
    // 0 = Playing
    // 1 = Streaming
    // 2 = Listening
    // 3 = Watching
    // 4 = Custom
    // 5 = Competing
    activities: [
      {
        name: "Custom Status", // required by Discord API, not shown in the client
        state: "Watching Over Exceed Reality!",     // this is what people actually see
        type: 4,               // Custom
      },
    ],
  },

  // =========================
  // COMMAND BEHAVIOR
  // =========================
  commands: {
    // Bot owner user IDs (comma-separated in OWNER_IDS env var).
    // Owners can access owner/admin-level bot commands.
    owners: process.env.OWNER_IDS?.split(",").map((id) => id.trim()).filter(Boolean) || [],

    // Default wait time between command uses (in seconds).
    defaultCooldown: 3,

    // If true, old commands are removed before re-registering.
    deleteCommands: false,

    // Optional server ID retained for tutorial compatibility; not used for command registration.
    testGuildId: process.env.TEST_GUILD_ID,

    // When true (or MAINTENANCE_MODE=true), only bot owners can run commands.
    maintenanceMode: process.env.MAINTENANCE_MODE === "true",

    // Command prefix for text-based commands (e.g., "!" for "!ping").
    // Supports both slash commands and prefix commands.
    prefix: process.env.PREFIX || "!",
  },

  // =========================
  // APPLICATIONS SYSTEM
  // =========================
  applications: {
    // Default questions shown when someone fills out an application.
    defaultQuestions: [
      { question: "What is your name?", required: true },
      { question: "How old are you?", required: true },
      { question: "Why do you want to join?", required: true },
    ],

    // Embed colors by application status.
    statusColors: {
      pending: "#FFA500",
      approved: "#00FF00",
      denied: "#FF0000",
    },

    // How long users must wait before submitting another application (hours).
    applicationCooldown: 24,

    // Auto-delete denied applications after this many days.
    deleteDeniedAfter: 7,

    // Auto-delete approved applications after this many days.
    deleteApprovedAfter: 30,

    // Role IDs allowed to manage applications.
    managerRoles: [], // Will be populated from environment or database
  },

  // =========================
  // EMBED COLORS & BRANDING
  // =========================
  // IMPORTANT: This is the SINGLE SOURCE OF TRUTH for all bot colors
  embeds: {
    colors: {
      // Main brand colors.
      primary: "#336699",
      secondary: "#2F3136",

      // Standard status colors for success/error/warning/info messages.
      success: "#57F287",
      error: "#ED4245",
      warning: "#FEE75C",
      info: "#3498DB",

      // Neutral utility colors.
      light: "#FFFFFF",
      dark: "#202225",
      gray: "#99AAB5",

      // Discord-style palette shortcuts.
      blurple: "#5865F2",
      green: "#57F287",
      yellow: "#FEE75C",
      fuchsia: "#EB459E",
      red: "#ED4245",
      black: "#000000",

      // Feature-specific colors.
      giveaway: {
        active: "#57F287",
        ended: "#ED4245",
      },
      ticket: {
        open: "#57F287",
        claimed: "#FAA61A",
        closed: "#ED4245",
        pending: "#99AAB5",
      },
      economy: "#F1C40F",
      birthday: "#E91E63",
      moderation: "#9B59B6",

      // Ticket priority color mapping.
      priority: {
        none: "#95A5A6",
        low: "#3498db",
        medium: "#2ecc71",
        high: "#f1c40f",
        urgent: "#e74c3c",
      },
    },
    footer: {
      // Default footer text used in bot embeds.
      text: "Titan Bot",
      // Footer icon URL (null = no icon).
      icon: null,
    },
    // Default thumbnail URL for embeds (null = no thumbnail).
    thumbnail: null,
    author: {
      // Optional default embed author block.
      name: null,
      icon: null,
      url: null,
    },
  },

  // =========================
  // ECONOMY SETTINGS
  // =========================
  economy: {
    currency: {
      // Currency display name.
      name: "coins",
      // Plural display name.
      namePlural: "coins",
      // Currency symbol shown in balances.
      symbol: "$",
    },

    // Starting balance for new users.
    startingBalance: 0,

    // Maximum bank amount before upgrades (if upgrades are used).
    baseBankCapacity: 100000,

    // Daily reward amount.
    dailyAmount: 100,

    // Work command random payout range.
    workMin: 10,
    workMax: 100,

    // Beg command random payout range.
    begMin: 5,
    begMax: 50,

    // Command cooldowns (milliseconds).
    cooldowns: {
      daily: 24 * 60 * 60 * 1000,
      work: 60 * 60 * 1000,
      crime: 2 * 60 * 60 * 1000,
      rob: 4 * 60 * 60 * 1000,
    },

    // Chance to succeed when robbing (0.4 = 40%).
    robSuccessRate: 0.4,

    // Jail time after failed rob (milliseconds).
    // 3600000 = 1 hour.
    robFailJailTime: 3600000,
  },

  // =========================
  // SHOP SETTINGS
  // =========================
  // Add shop defaults here when needed.
  shop: {

  },

  // =========================
  // TICKET SYSTEM
  // =========================
  tickets: {
    // Category ID where new tickets are created (null = no forced category).
    defaultCategory: null,

    // Role IDs allowed to manage/support tickets.
    supportRoles: [],

    // Priority options users/staff can assign.
    priorities: {
      none: {
        emoji: "⚪",
        color: "#95A5A6",
        label: "None",
      },
      low: {
        emoji: "🟢",
        color: "#2ECC71",
        label: "Low",
      },
      medium: {
        emoji: "🟡",
        color: "#F1C40F",
        label: "Medium",
      },
      high: {
        emoji: "🔴",
        color: "#E74C3C",
        label: "High",
      },
      urgent: {
        emoji: "🚨",
        color: "#E91E63",
        label: "Urgent",
      },
    },

    // Default priority for new tickets.
    defaultPriority: "none",

    // Category ID where closed tickets are archived.
    archiveCategory: null,

    // Channel ID where ticket logs are sent.
    logChannel: null,
  },

  // =========================
  // GIVEAWAY SETTINGS
  // =========================
  giveaways: {
    // Default giveaway duration in milliseconds.
    // 86400000 = 24 hours.
    defaultDuration: 86400000,

    // Allowed winner count range.
    minimumWinners: 1,
    maximumWinners: 10,

    // Allowed giveaway duration range in milliseconds.
    // 300000 = 5 minutes.
    minimumDuration: 300000,
    // 2592000000 = 30 days.
    maximumDuration: 2592000000,

    // Role IDs allowed to host giveaways.
    allowedRoles: [],

    // Role IDs that bypass giveaway restrictions.
    bypassRoles: [],
  },

  // =========================
  // BIRTHDAY SETTINGS
  // =========================
  birthday: {
    // Role ID given to users on their birthday.
    defaultRole: null,

    // Channel ID where birthday announcements are posted.
    announcementChannel: null,

    // Timezone used to calculate birthday dates.
    timezone: "UTC",
  },

  // =========================
  // VERIFICATION SETTINGS
  // =========================
  verification: {
    // Message shown when posting the verification panel.
    defaultMessage: "Click the button below to verify yourself and gain access to the server!",

    // Text on the verification button.
    defaultButtonText: "Verify",

    // Automatic verification behavior.
    autoVerify: {
      // How automatic verification decides who is auto-approved:
      // - "none"        = everyone is auto-verified immediately
      // - "account_age" = account must be older than set days
      // - "server_size" = auto-verify everyone only in smaller servers
      defaultCriteria: "none",

      // Days used when `defaultCriteria` is `account_age`.
      defaultAccountAgeDays: 7,

      // Member count threshold used when `defaultCriteria` is `server_size`.
      // Example: 1000 means auto-verify if server has fewer than 1000 members.
      serverSizeThreshold: 1000,

      // Allowed safety limits for account-age requirements.
      // 1 = minimum day, 365 = maximum days.
      minAccountAge: 1,
      maxAccountAge: 365,

      // If true, user receives a DM after verification.
      sendDMNotification: true,

      // Human-readable descriptions for each criteria mode.
      criteria: {
        account_age: "Account must be older than specified days",
        server_size: "All users if server has less than 1000 members",
        none: "All users immediately"
      }
    },

    // Minimum time between verification attempts (milliseconds).
    // 5000 = 5 seconds.
    verificationCooldown: 5000,

    // Maximum failed attempts allowed inside the time window below.
    maxVerificationAttempts: 3,

    // Time window for counting attempts (milliseconds).
    // 60000 = 1 minute.
    attemptWindow: 60000,

    // In-memory safety limits (helps avoid unbounded memory growth).
    maxCooldownEntries: 10000,
    maxAttemptEntries: 10000,
    // Cleanup frequency for cooldown/attempt maps (milliseconds).
    // 300000 = 5 minutes.
    cooldownCleanupInterval: 300000,
    // Maximum metadata payload size for audit entries (bytes).
    maxAuditMetadataBytes: 4096,
    // Maximum number of audit entries kept in memory.
    maxInMemoryAuditEntries: 1000,
    // If true, log every verification action.
    logAllVerifications: true,
    // If true, preserve verification audit history.
    keepAuditTrail: true,
  },

  // =========================
  // WELCOME / GOODBYE MESSAGES
  // =========================
  welcome: {
    // Welcome template posted when a user joins.
    // Placeholders: {user}, {server}, {memberCount}
    defaultWelcomeMessage:
      "Welcome {user} to {server}! We now have {memberCount} members!",
    // Goodbye template posted when a user leaves.
    // Placeholders: {user}, {memberCount}
    defaultGoodbyeMessage:
      "{user} has left the server. We now have {memberCount} members.",
    // Channel ID for welcome messages.
    defaultWelcomeChannel: null,
    // Channel ID for goodbye messages.
    defaultGoodbyeChannel: null,
  },

  // =========================
  // COUNTER CHANNELS
  // =========================
  counters: {
    defaults: {
      // Default naming/description templates for counter entries.
      name: "{name} Counter",
      description: "Server {name} counter",
      // Channel type used for counters (typically "voice").
      type: "voice",
      // Channel name format. `{count}` is replaced automatically.
      channelName: "{name}-{count}",
    },
    permissions: {
      // Default denied permissions for the counter channel.
      deny: ["VIEW_CHANNEL"],
      // Default allowed permissions for the counter channel.
      allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK"],
    },
    messages: {
      // Default response messages for counter actions.
      created: "✅ Created counter **{name}**",
      deleted: "🗑️ Deleted counter **{name}**",
      updated: "🔄 Updated counter **{name}**",
    },
    types: {
      // Built-in counter types and how each count is calculated.
      members: {
        name: "👥 Members",
        description: "Total members in the server",
        getCount: (guild) => guild.memberCount.toString(),
      },
      bots: {
        name: "🤖 Bots",
        description: "Total bot accounts in the server",
        getCount: (guild) =>
          guild.members.cache.filter((m) => m.user.bot).size.toString(),
      },
      members_only: {
        name: "👤 Humans",
        description: "Total human members (non-bots)",
        getCount: (guild) =>
          guild.members.cache.filter((m) => !m.user.bot).size.toString(),
      },
    },
  },

  // =========================
  // GENERIC BOT MESSAGES
  // =========================
  messages: {
    noPermission: "You do not have permission to use this command.",
    cooldownActive: "Please wait {time} before using this command again.",
    errorOccurred: "An error occurred while executing this command.",
    missingPermissions:
      "I am missing required permissions to perform this action.",
    commandDisabled: "This command has been disabled.",
    maintenanceMode: "The bot is currently in maintenance mode.",
  },

  // =========================
  // FEATURE TOGGLES
  // =========================
  // Set any feature to `false` to disable it globally.
  features: {
    // Core systems.
    economy: true,
    leveling: true,
    moderation: true,
    logging: true,
    welcome: true,

    // Community engagement systems.
    tickets: true,
    giveaways: true,
    birthday: true,
    counter: true,

    // Security and self-service systems.
    verification: true,
    reactionRoles: true,
    joinToCreate: true,

    // Utility/quality-of-life modules.
    voice: true,
    search: true,
    tools: true,
    utility: true,
    community: true,
    fun: true,
    music: true,
  },
};

export function validateConfig(config) {
  const errors = [];

  if (process.env.NODE_ENV !== 'production') {
    logger.debug('Environment variables check:');
    logger.debug('DISCORD_TOKEN exists:', !!process.env.DISCORD_TOKEN);
    logger.debug('TOKEN exists:', !!process.env.TOKEN);
    logger.debug('CLIENT_ID exists:', !!process.env.CLIENT_ID);
    logger.debug('GUILD_ID exists:', !!process.env.GUILD_ID);
    logger.debug('POSTGRES_HOST exists:', !!process.env.POSTGRES_HOST);
    logger.debug('NODE_ENV:', process.env.NODE_ENV);
  }

  if (!process.env.DISCORD_TOKEN && !process.env.TOKEN) {
    errors.push("Bot token is required (DISCORD_TOKEN or TOKEN environment variable)");
  }

  if (!process.env.CLIENT_ID) {
    errors.push("Client ID is required (CLIENT_ID environment variable)");
  }

  if (process.env.NODE_ENV === 'production') {
    // A full connection URL (DATABASE_URL / POSTGRES_URL) satisfies all Postgres
    // requirements, matching how src/config/database/postgres.js resolves the pool config.
    const hasConnectionUrl = Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL);

    if (!hasConnectionUrl) {
      if (!process.env.POSTGRES_HOST) {
        errors.push("PostgreSQL connection is required in production (set DATABASE_URL/POSTGRES_URL, or POSTGRES_HOST)");
      }
      if (!process.env.POSTGRES_USER) {
        errors.push("PostgreSQL user is required in production (set DATABASE_URL/POSTGRES_URL, or POSTGRES_USER)");
      }
      if (!process.env.POSTGRES_PASSWORD) {
        errors.push("PostgreSQL password is required in production (set DATABASE_URL/POSTGRES_URL, or POSTGRES_PASSWORD)");
      }
    }
  }

  return errors;
}

const configErrors = validateConfig(botConfig);
if (configErrors.length > 0) {
  logger.error("Bot configuration errors:", configErrors.join("\n"));
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  }
}

export const BotConfig = botConfig;

const COMMAND_CATEGORY_FEATURE_MAP = {
  birthday: "birthday",
  community: "community",
  economy: "economy",
  fun: "fun",
  giveaway: "giveaways",
  jointocreate: "joinToCreate",
  leveling: "leveling",
  logging: "logging",
  moderation: "moderation",
  music: "music",
  reaction_roles: "reactionRoles",
  search: "search",
  serverstats: "counter",
  ticket: "tickets",
  tools: "tools",
  utility: "utility",
  verification: "verification",
  welcome: "welcome",
};

function normalizeCategoryKey(category) {
  return String(category || "").trim().toLowerCase().replace(/\s+/g, "_");
}

export function getCommandPrefix() {
  return botConfig.commands?.prefix ?? "!";
}

export function getBotOwners() {
  return (botConfig.commands?.owners ?? [])
    .map((id) => String(id).trim())
    .filter(Boolean);
}

export function isBotOwner(userId) {
  if (!userId) {
    return false;
  }

  return getBotOwners().includes(String(userId));
}

export function isMaintenanceMode() {
  return botConfig.commands?.maintenanceMode === true;
}

export function getBotMessage(key, replacements = {}) {
  let message = botConfig.messages?.[key] || key;

  for (const [placeholder, value] of Object.entries(replacements)) {
    message = message.replace(new RegExp(`\\{${placeholder}\\}`, "g"), String(value));
  }

  return message;
}

export function isFeatureEnabled(featureKey) {
  if (!featureKey) {
    return true;
  }

  return botConfig.features?.[featureKey] !== false;
}

export function isCommandCategoryEnabled(category) {
  const normalized = normalizeCategoryKey(category);

  if (!normalized || normalized === "core") {
    return true;
  }

  const featureKey = COMMAND_CATEGORY_FEATURE_MAP[normalized];
  if (!featureKey) {
    return true;
  }

  return isFeatureEnabled(featureKey);
}

export function getApplicationStatusColor(status) {
  const colors = botConfig.applications?.statusColors || {};
  const hex = colors[status];
  return hex ? getColor(hex) : getColor(status === "approved" ? "success" : status === "denied" ? "error" : "warning");
}

export function getDefaultApplicationQuestions() {
  return (botConfig.applications?.defaultQuestions || []).map((entry) =>
    typeof entry === "string" ? entry : entry.question,
  ).filter(Boolean);
}

export function getColor(path, fallback = "#99AAB5") {
  
  if (typeof path === "number") return path;
  if (typeof path === "string" && path.startsWith("#")) {
    
    return parseInt(path.replace("#", ""), 16);
  }
  const result = path
    .split(".")
    .reduce(
      (obj, key) => (obj && obj[key] !== undefined ? obj[key] : fallback),
      botConfig.embeds.colors,
    );
  
  if (typeof result === "string" && result.startsWith("#")) {
    return parseInt(result.replace("#", ""), 16);
  }
  return result;
}

export function getRandomColor() {
  const colors = Object.values(botConfig.embeds.colors).flatMap((color) =>
    typeof color === "string" ? color : Object.values(color),
  );
  return colors[Math.floor(Math.random() * colors.length)];
}

export default botConfig;
```js
const {
    Client,
    GatewayIntentBits,
    Partials,
    EmbedBuilder,
    AuditLogEvent
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember
    ]
});

// ================================
// CONFIGURATION
// ================================

const TOKEN = process.env.DISCORD_TOKEN;

// Put your logging channel ID here.
// Example: "123456789012345678"
const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID;

// ================================
// LOGGING FUNCTION
// ================================

async function logEvent(guild, title, description, color = 0x5865F2) {
    if (!guild) return;

    const channel = guild.channels.cache.get(LOG_CHANNEL_ID);

    if (!channel) {
        console.log(`[LOGGER] Log channel not found in ${guild.name}`);
        return;
    }

    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setTimestamp()
        .setFooter({
            text: `${guild.name} • Server Logger`
        });

    try {
        await channel.send({ embeds: [embed] });
    } catch (error) {
        console.error("[LOGGER] Failed to send log:", error);
    }
}

// ================================
// BOT READY
// ================================

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log(`Logging server events...`);
});

// ================================
// MEMBER JOIN
// ================================

client.on("guildMemberAdd", async member => {
    await logEvent(
        member.guild,
        "👤 Member Joined",
        `**User:** ${member.user.tag}\n**ID:** \`${member.id}\``,
        0x57F287
    );
});

// ================================
// MEMBER LEAVE
// ================================

client.on("guildMemberRemove", async member => {
    await logEvent(
        member.guild,
        "🚪 Member Left",
        `**User:** ${member.user.tag}\n**ID:** \`${member.id}\``,
        0xED4245
    );
});

// ================================
// MESSAGE DELETE
// ================================

client.on("messageDelete", async message => {
    if (!message.guild) return;

    const content = message.content || "*No message content available*";

    await logEvent(
        message.guild,
        "🗑️ Message Deleted",
        `**Author:** ${message.author?.tag || "Unknown"}\n` +
        `**Channel:** ${message.channel}\n` +
        `**Message ID:** \`${message.id}\`\n\n` +
        `**Content:**\n${content.substring(0, 1000)}`,
        0xED4245
    );
});

// ================================
// MESSAGE EDIT
// ================================

client.on("messageUpdate", async (oldMessage, newMessage) => {
    if (!oldMessage.guild) return;
    if (oldMessage.author?.bot) return;

    if (oldMessage.content === newMessage.content) return;

    await logEvent(
        oldMessage.guild,
        "✏️ Message Edited",
        `**Author:** ${oldMessage.author?.tag || "Unknown"}\n` +
        `**Channel:** ${oldMessage.channel}\n` +
        `**Message:** [Jump to message](${newMessage.url})\n\n` +
        `**Before:**\n${(oldMessage.content || "*Empty*").substring(0, 500)}\n\n` +
        `**After:**\n${(newMessage.content || "*Empty*").substring(0, 500)}`,
        0xFEE75C
    );
});

// ================================
// CHANNEL CREATE
// ================================

client.on("channelCreate", async channel => {
    if (!channel.guild) return;

    await logEvent(
        channel.guild,
        "📁 Channel Created",
        `**Channel:** ${channel}\n` +
        `**Name:** ${channel.name}\n` +
        `**ID:** \`${channel.id}\``,
        0x57F287
    );
});

// ================================
// CHANNEL DELETE
// ================================

client.on("channelDelete", async channel => {
    if (!channel.guild) return;

    await logEvent(
        channel.guild,
        "🗑️ Channel Deleted",
        `**Name:** ${channel.name}\n` +
        `**ID:** \`${channel.id}\``,
        0xED4245
    );
});

// ================================
// CHANNEL UPDATE
// ================================

client.on("channelUpdate", async (oldChannel, newChannel) => {
    if (!newChannel.guild) return;

    let changes = [];

    if (oldChannel.name !== newChannel.name) {
        changes.push(
            `**Name:** \`${oldChannel.name}\` → \`${newChannel.name}\``
        );
    }

    if (oldChannel.topic !== newChannel.topic) {
        changes.push(`**Topic changed**`);
    }

    if (changes.length === 0) return;

    await logEvent(
        newChannel.guild,
        "📝 Channel Updated",
        `**Channel:** ${newChannel}\n\n${changes.join("\n")}`,
        0xFEE75C
    );
});

// ================================
// ROLE CREATE
// ================================

client.on("roleCreate", async role => {
    await logEvent(
        role.guild,
        "🆕 Role Created",
        `**Role:** ${role}\n` +
        `**Name:** ${role.name}\n` +
        `**ID:** \`${role.id}\``,
        0x57F287
    );
});

// ================================
// ROLE DELETE
// ================================

client.on("roleDelete", async role => {
    await logEvent(
        role.guild,
        "❌ Role Deleted",
        `**Role:** ${role.name}\n` +
        `**ID:** \`${role.id}\``,
        0xED4245
    );
});

// ================================
// ROLE UPDATE
// ================================

client.on("roleUpdate", async (oldRole, newRole) => {
    let changes = [];

    if (oldRole.name !== newRole.name) {
        changes.push(
            `**Name:** \`${oldRole.name}\` → \`${newRole.name}\``
        );
    }

    if (oldRole.color !== newRole.color) {
        changes.push("**Color changed**");
    }

    if (changes.length === 0) return;

    await logEvent(
        newRole.guild,
        "🔧 Role Updated",
        `**Role:** ${newRole}\n\n${changes.join("\n")}`,
        0xFEE75C
    );
});

// ================================
// MEMBER UPDATE
// ================================

client.on("guildMemberUpdate", async (oldMember, newMember) => {
    let changes = [];

    if (oldMember.nickname !== newMember.nickname) {
        changes.push(
            `**Nickname:** \`${oldMember.nickname || "None"}\` → \`${newMember.nickname || "None"}\``
        );
    }

    const oldRoles = oldMember.roles.cache;
    const newRoles = newMember.roles.cache;

    const addedRoles = newRoles.filter(role => !oldRoles.has(role.id));
    const removedRoles = oldRoles.filter(role => !newRoles.has(role.id));

    if (addedRoles.size) {
        changes.push(
            `**Roles Added:** ${addedRoles.map(r => r).join(", ")}`
        );
    }

    if (removedRoles.size) {
        changes.push(
            `**Roles Removed:** ${removedRoles.map(r => r.name).join(", ")}`
        );
    }

    if (changes.length === 0) return;

    await logEvent(
        newMember.guild,
        "👤 Member Updated",
        `**User:** ${newMember.user.tag}\n\n${changes.join("\n")}`,
        0xFEE75C
    );
});

// ================================
// BAN
// ================================

client.on("guildBanAdd", async ban => {
    await logEvent(
        ban.guild,
        "🔨 Member Banned",
        `**User:** ${ban.user.tag}\n` +
        `**ID:** \`${ban.user.id}\``,
        0xED4245
    );
});

// ================================
// UNBAN
// ================================

client.on("guildBanRemove", async ban => {
    await logEvent(
        ban.guild,
        "🔓 Member Unbanned",
        `**User:** ${ban.user.tag}\n` +
        `**ID:** \`${ban.user.id}\``,
        0x57F287
    );
});

// ================================
// VOICE STATE
// ================================

client.on("voiceStateUpdate", async (oldState, newState) => {
    const member = newState.member || oldState.member;

    if (!member) return;

    // Joined voice
    if (!oldState.channel && newState.channel) {
        await logEvent(
            member.guild,
            "🔊 Joined Voice Channel",
            `**User:** ${member.user.tag}\n` +
            `**Channel:** ${newState.channel}`,
            0x57F287
        );
    }

    // Left voice
    else if (oldState.channel && !newState.channel) {
        await logEvent(
            member.guild,
            "🔇 Left Voice Channel",
            `**User:** ${member.user.tag}\n` +
            `**Channel:** ${oldState.channel}`,
            0xED4245
        );
    }

    // Moved voice channels
    else if (
        oldState.channel &&
        newState.channel &&
        oldState.channel.id !== newState.channel.id
    ) {
        await logEvent(
            member.guild,
            "🔀 Voice Channel Moved",
            `**User:** ${member.user.tag}\n` +
            `**From:** ${oldState.channel}\n` +
            `**To:** ${newState.channel}`,
            0x5865F2
        );
    }
});

// ================================
// EMOJI UPDATE
// ================================

client.on("emojiCreate", async emoji => {
    await logEvent(
        emoji.guild,
        "😀 Emoji Created",
        `**Emoji:** ${emoji}\n` +
        `**Name:** ${emoji.name}\n` +
        `**ID:** \`${emoji.id}\``,
        0x57F287
    );
});

client.on("emojiDelete", async emoji => {
    await logEvent(
        emoji.guild,
        "🗑️ Emoji Deleted",
        `**Name:** ${emoji.name}\n` +
        `**ID:** \`${emoji.id}\``,
        0xED4245
    );
});

// ================================
// STICKER UPDATE
// ================================

client.on("stickerCreate", async sticker => {
    await logEvent(
        sticker.guild,
        "🏷️ Sticker Created",
        `**Name:** ${sticker.name}\n` +
        `**ID:** \`${sticker.id}\``,
        0x57F287
    );
});

client.on("stickerDelete", async sticker => {
    await logEvent(
        sticker.guild,
        "🗑️ Sticker Deleted",
        `**Name:** ${sticker.name}\n` +
        `**ID:** \`${sticker.id}\``,
        0xED4245
    );
});

// ================================
// THREAD CREATE
// ================================

client.on("threadCreate", async thread => {
    await logEvent(
        thread.guild,
        "🧵 Thread Created",
        `**Thread:** ${thread.name}\n` +
        `**ID:** \`${thread.id}\``,
        0x57F287
    );
});

// ================================
// THREAD DELETE
// ================================

client.on("threadDelete", async thread => {
    await logEvent(
        thread.guild,
        "🗑️ Thread Deleted",
        `**Thread:** ${thread.name}\n` +
        `**ID:** \`${thread.id}\``,
        0xED4245
    );
});

// ================================
// SERVER UPDATE
// ================================

client.on("guildUpdate", async (oldGuild, newGuild) => {
    let changes = [];

    if (oldGuild.name !== newGuild.name) {
        changes.push(
            `**Name:** \`${oldGuild.name}\` → \`${newGuild.name}\``
        );
    }

    if (oldGuild.icon !== newGuild.icon) {
        changes.push("**Server icon changed**");
    }

    if (changes.length === 0) return;

    await logEvent(
        newGuild,
        "⚙️ Server Updated",
        changes.join("\n"),
        0xFEE75C
    );
});

// ================================
// LOGIN
// ================================

client.login(TOKEN);
```
```js
const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require("discord.js");

const sqlite3 = require("sqlite3").verbose();

// ================================
// DATABASE
// ================================

const db = new sqlite3.Database("./database.sqlite");

db.run(`
    CREATE TABLE IF NOT EXISTS logging (
        guild_id TEXT PRIMARY KEY,
        channel_id TEXT
    )
`);

// ================================
// COMMAND
// ================================

const data = new SlashCommandBuilder()
    .setName("logging")
    .setDescription("Configure server event logging.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)

    .addSubcommand(subcommand =>
        subcommand
            .setName("setup")
            .setDescription("Set the channel where server events will be logged.")
            .addChannelOption(option =>
                option
                    .setName("channel")
                    .setDescription("The channel to send logs to.")
                    .setRequired(true)
            )
    )

    .addSubcommand(subcommand =>
        subcommand
            .setName("disable")
            .setDescription("Disable server logging.")
    )

    .addSubcommand(subcommand =>
        subcommand
            .setName("status")
            .setDescription("View the current logging configuration.")
    );

// ================================
// COMMAND EXECUTION
// ================================

async function execute(interaction) {

    if (!interaction.guild) {
        return interaction.reply({
            content: "❌ This command can only be used inside a server.",
            ephemeral: true
        });
    }

    const subcommand = interaction.options.getSubcommand();

    // ================================
    // SETUP
    // ================================

    if (subcommand === "setup") {

        const channel = interaction.options.getChannel("channel");

        // Make sure it's a text-based channel
        if (!channel.isTextBased()) {
            return interaction.reply({
                content: "❌ Please select a text-based channel.",
                ephemeral: true
            });
        }

        db.run(
            `
            INSERT INTO logging (guild_id, channel_id)
            VALUES (?, ?)
            ON CONFLICT(guild_id)
            DO UPDATE SET channel_id = excluded.channel_id
            `,
            [interaction.guild.id, channel.id],
            async error => {

                if (error) {
                    console.error(error);

                    return interaction.reply({
                        content: "❌ Something went wrong while saving the logging configuration.",
                        ephemeral: true
                    });
                }

                const embed = new EmbedBuilder()
                    .setTitle("✅ Logging Enabled")
                    .setDescription(
                        `Server logging has been enabled.\n\n` +
                        `**Log Channel:** ${channel}\n` +
                        `**Channel ID:** \`${channel.id}\``
                    )
                    .setColor(0x57F287)
                    .setTimestamp();

                await interaction.reply({
                    embeds: [embed]
                });

                // Test log
                const testEmbed = new EmbedBuilder()
                    .setTitle("📋 Logging System")
                    .setDescription(
                        `Logging has been successfully configured by ${interaction.user}.`
                    )
                    .setColor(0x5865F2)
                    .setTimestamp();

                await channel.send({
                    embeds: [testEmbed]
                });
            }
        );
    }

    // ================================
    // DISABLE
    // ================================

    if (subcommand === "disable") {

        db.run(
            `DELETE FROM logging WHERE guild_id = ?`,
            [interaction.guild.id],
            async error => {

                if (error) {
                    console.error(error);

                    return interaction.reply({
                        content: "❌ Failed to disable logging.",
                        ephemeral: true
                    });
                }

                const embed = new EmbedBuilder()
                    .setTitle("🔴 Logging Disabled")
                    .setDescription(
                        "Server event logging has been disabled."
                    )
                    .setColor(0xED4245)
                    .setTimestamp();

                await interaction.reply({
                    embeds: [embed]
                });
            }
        );
    }

    // ================================
    // STATUS
    // ================================

    if (subcommand === "status") {

        db.get(
            `SELECT channel_id FROM logging WHERE guild_id = ?`,
            [interaction.guild.id],
            async (error, row) => {

                if (error) {
                    console.error(error);

                    return interaction.reply({
                        content: "❌ Failed to retrieve logging status.",
                        ephemeral: true
                    });
                }

                if (!row) {
                    return interaction.reply({
                        content: "🔴 Server logging is currently **disabled**.",
                        ephemeral: true
                    });
                }

                const channel =
                    interaction.guild.channels.cache.get(row.channel_id);

                if (!channel) {
                    return interaction.reply({
                        content:
                            "⚠️ Logging is configured, but the configured channel no longer exists.",
                        ephemeral: true
                    });
                }

                const embed = new EmbedBuilder()
                    .setTitle("📋 Logging Status")
                    .setDescription(
                        `**Status:** 🟢 Enabled\n` +
                        `**Channel:** ${channel}\n` +
                        `**Channel ID:** \`${channel.id}\``
                    )
                    .setColor(0x57F287)
                    .setTimestamp();

                await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }
        );
    }
}

module.exports = {
    data,
    execute
};
```
```js
const {
    REST,
    Routes
} = require("discord.js");

require("dotenv").config();

const commands = [
    {
        name: "logging",
        description: "Configure server event logging.",
        default_member_permissions: "32",
        options: [
            {
                type: 1,
                name: "setup",
                description: "Set the channel where logs will be sent.",
                options: [
                    {
                        type: 7,
                        name: "channel",
                        description: "The channel to send logs to.",
                        required: true,
                        channel_types: [0, 5]
                    }
                ]
            },
            {
                type: 1,
                name: "disable",
                description: "Disable server event logging."
            },
            {
                type: 1,
                name: "status",
                description: "View the current logging configuration."
            }
        ]
    }
];

const rest = new REST({
    version: "10"
}).setToken(process.env.DISCORD_TOKEN);

async function deployCommands() {

    try {

        console.log("Registering slash commands...");

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            {
                body: commands
            }
        );

        console.log("✅ Slash commands registered successfully!");

    } catch (error) {

        console.error("❌ Failed to register commands:");
        console.error(error);

    }
}

deployCommands();
```
