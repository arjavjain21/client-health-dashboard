# Manual UI Testing Checklist - Historical Week Selector

**Purpose**: Browser-based verification of frontend functionality
**Estimated Time**: 15-20 minutes
**Required**: Modern web browser (Chrome/Firefox/Safari/Edge)

---

## Prerequisites

1. **Start the Application**
   ```bash
   cd /home/ubuntu/client-health-dashboard/app
   pnpm run dev
   ```

2. **Verify Server is Running**
   - Navigate to: http://localhost:3000
   - Should see: Client Health Dashboard main page

---

## Test 1: Navigation Flow (2 minutes)

### Step 1.1: Locate Historical Weeks Button
- [ ] On main dashboard, look for "Historical Weeks" button/link
- [ ] **Expected**: Button/link visible and clickable
- [ ] **Actual**: _____________________

### Step 1.2: Navigate to Historical Weeks
- [ ] Click "Historical Weeks" button/link
- [ ] **Expected**: Page navigates to `/historical-weeks`
- [ ] **Expected**: URL changes to `http://localhost:3000/historical-weeks`
- [ ] **Actual**: _____________________

### Step 1.3: Return to Main Dashboard
- [ ] Look for "Back to Current Week" button/link
- [ ] Click to return to main dashboard
- [ ] **Expected**: Returns to `/` (main dashboard)
- [ ] **Actual**: _____________________

---

## Test 2: Week Selector UI (5 minutes)

### Step 2.1: Dropdown Displays
- [ ] Navigate to `/historical-weeks`
- [ ] Locate week selector dropdown/component
- [ ] **Expected**: Dropdown visible with placeholder text
- [ ] **Actual**: _____________________

### Step 2.2: Expand Dropdown
- [ ] Click on week selector dropdown
- [ ] **Expected**: Dropdown expands and shows 4 weeks
- [ ] **Expected**: Format is "Week X (date range)" e.g., "Week 1 (Feb 13 - Feb 19)"
- [ ] **Expected**: Each week shows client count: "42 clients"
- [ ] **Actual**: _____________________

### Step 2.3: Week List Verification
- [ ] Count the number of weeks in dropdown
- [ ] **Expected**: Exactly 4 weeks
- [ ] **Expected**: Week 1 is most recent (Feb 13-19)
- [ ] **Expected**: Week 4 is oldest (Jan 23-29)
- [ ] **Actual**: _____________________

---

## Test 3: Single Week Selection (5 minutes)

### Step 3.1: Select Week 1
- [ ] Click on "Week 1 (Feb 13 - Feb 19)"
- [ ] **Expected**: Week is selected/highlighted
- [ ] **Actual**: _____________________

### Step 3.2: Apply Selection
- [ ] Click "Apply" button
- [ ] **Expected**: Loading spinner/message appears briefly
- [ ] **Expected**: Data table appears with client data
- [ ] **Actual**: _____________________

### Step 3.3: Verify Data Display
- [ ] Look for message: "Showing data for Week 1 (7 days)"
- [ ] **Expected**: Message is visible at top of page
- [ ] **Expected**: Table shows 42 rows
- [ ] **Expected**: Each row has client data (client_code, metrics, RAG status)
- [ ] **Actual**: _____________________

### Step 3.4: Verify Sample Data
- [ ] Locate client "HYPERKE" (should be in table)
- [ ] Check `contacted_7d` value
- [ ] **Expected**: Value around 49,798 (for Week 1)
- [ ] **Expected**: RAG status is "Green"
- [ ] **Actual**: _____________________

---

## Test 4: Multi-Week Selection (5 minutes)

### Step 4.1: Select Multiple Weeks
- [ ] Click week selector dropdown
- [ ] Select Week 1
- [ ] Select Week 2
- [ ] Select Week 3
- [ ] **Expected**: All 3 weeks are selected
- [ ] **Actual**: _____________________

### Step 4.2: Apply Multi-Week Selection
- [ ] Click "Apply" button
- [ ] **Expected**: Loading spinner/message appears briefly
- [ ] **Expected**: Data table updates with aggregated data
- [ ] **Actual**: _____________________

### Step 4.3: Verify Aggregation Message
- [ ] Look for message at top of page
- [ ] **Expected**: "Showing data for Week 1, Week 2, Week 3 (21 days)"
- [ ] **Expected**: Mentions 21 days (3 weeks × 7 days)
- [ ] **Actual**: _____________________

### Step 4.4: Verify Aggregated Metrics
- [ ] Locate client "HYPERKE" in table
- [ ] Check `contacted_7d` value
- [ ] **Expected**: Value is sum of 3 weeks (should be higher than single week)
- [ ] For Week 1 alone: ~49,798
- [ ] For Weeks 1+2+3: ~138,562 (or similar)
- [ ] **Actual**: _____________________

---

## Test 5: Clear Functionality (2 minutes)

### Step 5.1: Clear Selection
- [ ] With weeks selected, click "Clear" button
- [ ] **Expected**: Selection is cleared
- [ ] **Expected**: Dropdown closes (if open)
- [ ] **Expected**: No data displayed (or "Select weeks to view data" message)
- [ ] **Actual**: _____________________

### Step 5.2: Re-Apply Selection
- [ ] Select Week 1 again
- [ ] Click "Apply"
- [ ] **Expected**: Data loads again successfully
- [ ] **Actual**: _____________________

---

## Test 6: Table Functionality (3 minutes)

### Step 6.1: Column Sorting
- [ ] Click on any column header (e.g., "Client Name")
- [ ] **Expected**: Table sorts by that column
- [ ] Click again to reverse sort
- [ ] **Expected**: Sort direction reverses
- [ ] **Actual**: _____________________

### Step 6.2: RAG Status Display
- [ ] Look at RAG Status column
- [ ] **Expected**: Colored badges/icons for Green, Yellow, Red
- [ ] **Expected**: All historical weeks show Green (for current dataset)
- [ ] **Actual**: _____________________

### Step 6.3: CSV Export (if available)
- [ ] Look for "Export" or "Download CSV" button
- [ ] If present, click it
- [ ] **Expected**: CSV file downloads
- [ ] **Expected**: CSV contains all visible rows
- [ ] **Actual**: _____________________

---

## Test 7: Error Handling (2 minutes)

### Step 7.1: Open Browser DevTools
- [ ] Press F12 or right-click → "Inspect"
- [ ] Go to "Console" tab
- [ ] **Expected**: No red errors visible
- [ ] **Actual**: _____________________

### Step 7.2: Check Network Requests
- [ ] In DevTools, go to "Network" tab
- [ ] Refresh the page
- [ ] Look for requests to `/api/weeks` and `/api/dashboard/historical`
- [ ] **Expected**: All requests show status 200 OK
- [ ] **Expected**: Response times < 500ms
- [ ] **Actual**: _____________________

---

## Test 8: Responsive Design (3 minutes)

### Step 8.1: Desktop View (1920×1080)
- [ ] Resize browser to full screen
- [ ] **Expected**: All elements visible and properly aligned
- [ ] **Expected**: No horizontal scrollbars
- [ ] **Actual**: _____________________

### Step 8.2: Tablet View (768×1024)
- [ ] Open DevTools (F12)
- [ ] Click device toolbar icon (or Ctrl+Shift+M)
- [ ] Select "iPad" or set to 768×1024
- [ ] **Expected**: Layout adapts to smaller screen
- [ ] **Expected**: Week selector still accessible
- [ ] **Expected**: Table may have horizontal scroll (acceptable)
- [ ] **Actual**: _____________________

### Step 8.3: Mobile View (375×667)
- [ ] In DevTools device mode, select "iPhone SE" or set to 375×667
- [ ] **Expected**: Layout stacks vertically
- [ ] **Expected**: Week selector is still usable
- [ ] **Expected**: Table has horizontal scroll (acceptable)
- [ ] **Actual**: _____________________

---

## Test 9: Edge Cases (3 minutes)

### Test 9.1: Refresh Page with Selection
- [ ] Select Week 1
- [ ] Click Apply
- [ ] Refresh page (F5 or Ctrl+R)
- [ ] **Expected**: Page reloads and maintains selection
- [ ] **Expected**: Or, selection is cleared (also acceptable)
- [ ] **Actual**: _____________________

### Test 9.2: Navigate Away and Back
- [ ] Select Week 1 and click Apply
- [ ] Click "Back to Current Week"
- [ ] Click browser "Back" button
- [ ] **Expected**: Returns to historical weeks with previous selection
- [ ] **Actual**: _____________________

### Test 9.3: Rapid Clicking
- [ ] Click "Apply" button multiple times rapidly
- [ ] **Expected**: No duplicate requests or errors
- [ ] **Expected**: Loading state prevents double-submission
- [ ] **Actual**: _____________________

---

## Test 10: Cross-Browser Testing (Optional)

### Browsers to Test:
- [ ] Google Chrome (latest version)
- [ ] Mozilla Firefox (latest version)
- [ ] Safari (if on Mac)
- [ ] Microsoft Edge (if on Windows)

**For Each Browser**:
- [ ] Repeat Tests 1-6 above
- [ ] Note any rendering differences
- [ ] Note any functional issues

---

## Test Results Summary

### Tests Passed: _____ / 45
### Tests Failed: _____ / 45
### Issues Found: _____

### Critical Issues (Blocking Deployment):
1.
2.
3.

### Major Issues (Should Fix):
1.
2.
3.

### Minor Issues (Nice to Have):
1.
2.
3.

### UI/UX Feedback:
- What works well: _____________________
- What could be improved: _____________________
- Any confusion or difficulty: _____________________

---

## Screenshots to Capture

Please capture screenshots of:
1. ✅ Historical weeks page with week selector dropdown expanded
2. ✅ Historical weeks page with Week 1 selected and applied
3. ✅ Historical weeks page with multiple weeks (1,2,3) selected
4. ✅ Table showing RAG status badges
5. ❌ Any errors or unexpected behavior (if found)

**Screenshot Location**: _____________________

---

## Completion Checklist

- [ ] All tests completed
- [ ] Screenshots captured
-. [ ] Test results filled in above
- [ ] Any critical issues reported to development team
- [ ] Test report signed off

**Tester Name**: _____________________
**Test Date**: _____________________
**Browser Used**: _____________________
**Screen Resolution**: _____________________

---

## Notes for Testers

**What to Look For**:
- Smooth loading transitions
- Clear visual feedback for user actions
- Intuitive week selector UI
- Correct data aggregation for multi-week selections
- Proper error messages if something goes wrong

**What NOT to Worry About**:
- Minor visual inconsistencies (CSS tweaks can come later)
- Color scheme (can be adjusted later)
- Exact pixel-perfect layout (focus on functionality)

**When to Report Issues**:
- Data not loading correctly
- Broken interactions (buttons not working)
- Error messages in browser console
- Performance issues (page takes > 3 seconds to load)
- Confusing or misleading UI text

**Known Limitations** (for reference):
- Historical data is currently all "Green" status (this is correct for the dataset)
- Only 4 weeks of historical data available (will increase over time)
- Week selector uses predefined weeks (not custom date ranges)

---

**Good Luck and Thank You for Testing!** 🎉

Questions? Issues? Contact: _____________________
