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
    "ChangeEventStatus"
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
    "ChangeEventStatus"
]

module.exports = {
    rendererToMain,
    mainToRenderer
}