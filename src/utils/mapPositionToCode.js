function mapPositionToCode(position) {
  const lowerCasePosition = position.toLowerCase();

  switch (lowerCasePosition) {
    case "atacante":
      return "ATA";
    case "pontaesquerda":
      return "PE";
    case "pontadireita":
      return "PD";
    case "segundoatacante":
      return "SA";
    case "meiocampo":
      return "MC";
    case "meiaesquerda":
      return "ME";
    case "meiadireita":
      return "MD";
    case "volante":
      return "VOL";
    case "lateralesquerda":
      return "LE";
    case "lateraldireita":
      return "LD";
    case "zagueiro":
      return "ZAG";
    case "goleiro":
      return "GOL";
    default:
      return "ND";
  }
}

export default mapPositionToCode;