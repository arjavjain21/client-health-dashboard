# Client Health Dashboard - Team Guide

## What is this dashboard?

This is our daily health monitor for all client campaigns. It shows which clients are doing well, which need attention, and exactly what's happening with their email performance - all in one place.

**Access it at**: https://clienthealth.eagleinfoservice.com

---

## Understanding RAG Status (Red-Amber-Green)

Think of RAG as a quick health check for each client. It tells you instantly who needs help.

### 🔴 Red (Needs Immediate Attention)

Something is broken or critically behind. Drop everything and look at these clients first.

**Common triggers:**
- **Reply rate below 2%** - Emails aren't getting responses
- **Bounce rate 5% or higher** - Emails aren't reaching inboxes
- **No contact in 7 days** - Zero emails sent recently
- **Volume below 50% of target** - Way behind on weekly goals

**What to do:**
1. Check the client's campaigns - are they running?
2. Look at bounce rate - are email addresses valid?
3. Check if they're paused or have issues
4. Escalate to the account manager immediately

### 🟡 Amber (Keep an Eye On)

Not critical yet, but trending in the wrong direction.

**Common triggers:**
- **Positive reply rate below 0.2%** - Getting replies, but not quality leads
- **Volume between 50-80% of target** - Behind, but not critically

**What to do:**
1. Check if they're on track to hit weekly targets
2. Review campaign performance - are lists good quality?
3. Plan intervention if they slip to Red

### 🟢 Green (Healthy)

Everything is working as expected.

**What this means:**
- Reply rates are healthy (2% or higher)
- Bounce rates are low (below 3%)
- Volume is on track (80%+ of target)

**What to do:**
- Keep doing what you're doing
- Monitor for any sudden drops in performance

---

## How Metrics Are Calculated

### Data Source
We pull data from two places:
1. **Client database** - Who owns the account, targets, setup info
2. **Campaign reporting** - Actual performance data (emails sent, replies, bounces)

### Time Window
**Friday to Yesterday** (always the most recent completed week)

*Example: If today is Thursday Jan 16, the dashboard shows data from Friday Jan 10 to Wednesday Jan 15.*

### Key Metrics Explained

#### 1. Emails Sent (7d)
**What it is**: Total emails sent in the last 7 days

#### 2. New Leads (7d)
**What it is**: Number of unique people reached for the first time

#### 3. Replies (7d)
**What it is**: People who responded to our emails

#### 4. Reply Rate
**Formula**: Replies ÷ New Leads

**Example**: 182 replies from 17,323 new leads = 1.05%

**Target**: 2% or higher

**Why it matters**: Shows if emails are resonating with the audience

#### 5. Positive Replies (7d)
**What it is**: Replies that indicate real interest (not just "thanks" or "not interested")

#### 6. Positive Rate (PRR)
**Formula**: Positive Replies ÷ Total Replies

**Example**: 27 positive replies from 182 total replies = 14.8%

**Why it matters**: Tells us about lead quality - are we reaching the right people?

#### 7. Bounce Rate
**Formula**: Bounced Emails ÷ Emails Sent

**Target**: Below 3%

**Color coding**:
- 🟢 Green: Below 3%
- 🟡 Amber: 3-5%
- 🔴 Red: 5% or higher

**Why it matters**: High bounces mean emails aren't reaching inboxes - bad lists or wrong addresses

#### 8. PCPL (Prospects Contacted Per Positive Lead)
**Formula**: New Leads ÷ Positive Replies

**Example**: 17,323 leads ÷ 27 positives = 642 leads per positive

**Lower is better** - means you're getting more quality responses from fewer leads

---

## When Does Data Update?

### Automatic Updates
- **Data refreshes daily around 11:00 AM IST**
- This happens after our source systems update (10:30 AM IST)

### What You'll See
- Top of dashboard shows the date range (e.g., "Jan 10 - Jan 15")
- Data status indicator shows if data is fresh or stale
- Hover over any client to see exact numbers

### Weekend Schedule
- On Fridays, you'll see data from the previous Friday through Thursday
- On Mondays, you'll see Friday through Sunday data
- No manual updates needed - it's automatic

---

## How to Use This Dashboard

### Daily Routine (5-10 minutes)

1. **Check RAG summary first** - Quick scan of Red/Amber/Green counts
2. **Sort by RAG status** - Click "Health" column to see Red clients first
3. **Investigate Red clients** - Hover over client name to see the specific issue
4. **Check Amber clients** - Plan interventions before they become Red
5. **Spot trends** - Sort by reply rate, bounce rate, or PCPL to find patterns

### Weekly Deep Dive (30 minutes)

1. **Export to CSV** - Click "Export CSV" for full analysis
2. **Compare week-over-week** - Look for clients slipping from Green to Amber
3. **Review underperformers** - Focus on consistently low PRR or high bounces
4. **Share with team** - Account managers can see their clients at a glance
4. **Plan interventions** - Use data to drive 1:1s and strategy discussions

### Common Questions

**"Why is a client Red when they hit target?"**
- RAG considers multiple factors - they might hit volume but have terrible reply rates
- Hover over the client to see the specific reason

**"The data looks outdated"**
- Check the date range at the top
- If it says "stale," the ingestion might have failed - contact tech team
- Data should never be more than 24 hours old

**"How do I fix a client with high bounces?"**
- Verify email lists are clean and up-to-date
- Check if domains are valid
- Review campaign targeting criteria
- Consider pausing and cleaning the list

**"What's a 'good' reply rate?"**
- 2% is our minimum threshold
- Top performers see 3-5%
- Industry average is 1-2%, so we're aiming above average

---

## Pro Tips

### Keyboard Shortcuts
- **Ctrl/Cmd + F** - Quick search by client name
- **Click any column header** - Sort by that metric
- **Hover over client name** - See detailed breakdown

### Filtering
- Use filters on the left to zoom in:
  - Only your clients (your name as AM/IM/SDR)
  - Only Red/Amber clients
  - Specific relationship status

### URL Sharing
- The dashboard URL updates when you filter or sort
- Copy the URL to share your exact view with teammates
- Great for: "Here are all my Red clients this week"

### Data Actions
- Click any client name to see detailed campaign breakdown
- Export to CSV for deeper Excel analysis
- Use unmatched mappings report to find data issues

---

## FAQ

**Q: How often should I check this?**
A: Daily if you manage clients. Weekly if you're leadership.

**Q: What if I see something wrong?**
A:
- Obvious data error → Tech team
- Strategy question → Account manager
- Client issue → Client success team

**Q: Can I export this data?**
A: Yes! Click "Export CSV" button at the top right.

**Q: Why is my client showing as 'No data'?**
A: Either they're new (less than 7 days of data) or they haven't sent any emails. Check the "Issues" column.

**Q: Does this include bookings data?**
A: Not yet. v1 focuses on campaign performance. Bookings and qualification metrics coming in v2.

---

## Getting Help

**Dashboard issues**: Contact tech team
**Interpreting metrics**: Talk to your manager
**Client-specific questions**: Check with the account manager
**Feature requests**: Share with the product team

---

## Quick Reference Card

| Metric | Good | Warning | Critical |
|--------|------|---------|----------|
| Reply Rate | ≥2% | 1.5-2% | <1.5% |
| Bounce Rate | <3% | 3-5% | ≥5% |
| Positive Rate | >5% | 0.2-5% | <0.2% |
| Volume vs Target | ≥80% | 50-80% | <50% |

**Remember**: RAG is your friend. 🔴 Act now. 🟡 Watch closely. 🟢 Keep going.

---

*Last updated: January 2026*
*Dashboard version: 1.0*
*Questions? Check the README or contact the tech team*
