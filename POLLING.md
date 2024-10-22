# Data & when it changes
## available tournaments
  * after registering for a tournament
    * component refreshes - no need for polling
## enrolled tournaments
  * after registering for a tournament
    * component refreshes
      * information is only needed on a different page
      * no need for polling
## active draft
  * once a new draft in the same tournament gets started
  * realistically, there's a break between draft A and draft B
    * if we don't poll at all, data is not going to update
    * idea: poll for a new draft:
      * when there is no active draft OR
      * when there is an active draft and user does action X (where player has finished the draft)
        * service has to return only drafts where action X has not yet been completed by the player
    * alternatively, we can just poll for new drafts every 10 minutes or so
## active match
  * once a round gets paired (and the TO lets players know)
  * users need to refresh for this
## result reporting in current match
  * in the past (with medium-frequency polling) users often reported, but their opponent already had.
  Thus the used the report form in an old site state, so it did not go through (and could potentially cause integrity conflicts)
  * this data needs to be up-to-date
    * issue I don't want to keep polling every 5 seconds during 32 or more 50-minute matches when the polling is only needed in the last 5 minutes
    * I could do WebSockets only for matches & results, but that seems like an architectural nightmare

