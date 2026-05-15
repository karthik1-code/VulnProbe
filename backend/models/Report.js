const mongoose =
  require("mongoose");

/*
  FINDING SCHEMA
*/

const findingSchema =
  new mongoose.Schema(
    {
      /*
        TITLE
      */

      title: {
        type: String,

        required: true,
      },

      /*
        SEVERITY
      */

      severity: {
        type: String,

        enum: [
          "Critical",

          "High",

          "Medium",

          "Low",
        ],

        default: "Low",
      },

      /*
        CATEGORY
      */

      category: {
        type: String,

        default:
          "General",
      },

      /*
        IMPACT
      */

      impact: {
        type: String,

        default:
          "Potential security impact detected.",
      },

      /*
        RECOMMENDATION
      */

      recommendation:
        {
          type: String,

          default:
            "Review and mitigate this issue.",
        },

      /*
        STATUS
      */

      status: {
        type: String,

        default:
          "Detected",
      },
    },

    {
      _id: false,
    }
  );

/*
  REPORT SCHEMA
*/

const reportSchema =
  new mongoose.Schema(
    {
      /*
        USER
      */

      user: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",

        required: true,
      },

      /*
        TARGET
      */

      target: {
        type: String,

        required: true,
      },

      /*
        SEVERITY
      */

      severity: {
        type: String,

        enum: [
          "Critical",

          "High",

          "Medium",

          "Low",
        ],

        default: "Low",
      },

      /*
        RISK SCORE
      */

      riskScore: {
        type: Number,

        default: 0,
      },

      /*
        TOTAL VULNS
      */

      vulnerabilities: {
        type: Number,

        default: 0,
      },

      /*
        STATUS
      */

      status: {
        type: String,

        enum: [
          "Pending",

          "Monitoring",

          "Resolved",
        ],

        default:
          "Resolved",
      },

      /*
        STRUCTURED FINDINGS
      */

      findings: {
        type: [
          findingSchema,
        ],

        default: [],
      },

      /*
        TECHNOLOGIES
      */

      technologies: {
        type: [String],

        default: [],
      },

      /*
        METHODS
      */

      methods: {
        type: [String],

        default: [],
      },

      /*
        INFRASTRUCTURE
      */

      infrastructure: {
        type: [String],

        default: [],
      },

      /*
        REDIRECTS
      */

      redirects: {
        type: [String],

        default: [],
      },

      /*
        SCAN TIME
      */

      scanTime: {
        type: String,

        default: "0ms",
      },
    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Report",

    reportSchema
  );