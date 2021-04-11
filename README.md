## Coding Challenge

Uses an edge-based approach, moving in from the outside, and keeps running totals to prevent duplicate calulcations.

## Frontend Challenge

Demo here: [https://andrewjones.me/L53IXF/gumroad-demo](https://andrewjones.me/L53IXF/gumroad-demo)

- Supports profile links
- Supports multiple products or profile links on the same page
- Supports styled or unstyled variants
- Preloading built-in
- Lazy-loaded so that we don't negatively impact our creators' sites where they're embedding this iframes

If I had more time, I would've added better mobile styling for the iframe, and iframe deduplication (if the same link shows twice, ideally we would only create one iframe for that link)

## Data Modeling

Seller <1----\*> Product <1----\*> Purchase

To achieve this structure, I would have a separate table for each structure (seller, product, and purchase). 
Along with all of the basic info for each structure:
-   The seller would have a `current_balance` column for the total they're owed
-   The product table would have a column for seller ID
-   The purchase table would have a column for product ID and a column for seller ID
-   The purchase table would have a column called `amount_paid_to_seller` for the portion of the price paid to the seller, after fees and taxes are removed.
-   The purchases table would also have a date-time column, which would allow for querying by date range.

I would create an index with the purchase date-time, `amount_paid_to_seller`, the seller ID, and the purchase ID.
The index would enable efficient refunds:
-   When a purchase is created, we would get the seller's ID and increase the seller balance.
-   When a purchase is refunded, we would get the seller's ID and decrease their balance by `amount_paid_to_seller`.

The date-time field could also be used to very efficiently query for purchases in the date range of the payout, and we could then decrease the seller balance_owed as the sellers are paid.