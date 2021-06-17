const rendererToMain = [
    "windowState",
    "onEventAdd",
    "onSprintAdd",
    "LoadSprints",
    "LoadCalendarData",
    "LoadSprint",
    "EditSprint",
    "DeleteSprint",
    "DeletedEvent",
    "LoadEventsWithoutParents",
    "LoadSprintsToday",
    "ChangeEventStatus",
    "ChangeEventStatus1", //cant have both channels open in 1 page
]

const mainToRenderer = [
    "onEventAdd",
    "onSprintAdd",
    "LoadSprints",
    "LoadCalendarData",
    "LoadSprint",
    "EditSprint",
    "DeleteSprint",
    "DeletedEvent",
    "LoadEventsWithoutParents",
    "LoadSprintsToday",
    "ChangeEventStatus",
    "ChangeEventStatus1", //cant have both channels open in 1 page
]

module.exports = {
    rendererToMain,
    mainToRenderer
}