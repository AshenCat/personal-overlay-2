const rendererToMain = [
    "windowState",
    "onEventAdd",
    "onSprintAdd",
    "LoadSprints",
    "LoadCalendarEvents",
    "LoadSprint",
    "EditSprint",
    "DeleteSprint",
    "DeletedEvent"
]

const mainToRenderer = [
    "onEventAdd",
    "onSprintAdd",
    "LoadSprints",
    "LoadCalendarEvents",
    "LoadSprint",
    "EditSprint",
    "DeleteSprint",
    "DeletedEvent"
]

module.exports = {
    rendererToMain,
    mainToRenderer
}