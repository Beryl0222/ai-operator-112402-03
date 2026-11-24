export function sample(input, frame, revision = 1) {
  const { channels, startAt, repeat } = input;
  const x = new Float64Array(channels);
  const skip = new Float64Array(channels);
  const valid = new Uint8Array(channels);
  const slots = [];
  const profile = input.profiles[Number(frame >= startAt)];
  for (let slot = 0; slot < channels; slot += 1) {
    const joint = (slot + profile.axisShift) % channels;
    slots.push(joint);
    const v = Math.imul(frame * channels + joint + 17, 433494437);
    x[slot] = (v >> 20) / 8192 + 8192;
    skip[slot] = (v % 33) / 4096;
    valid[slot] = (frame + joint) % 11 ? 1 : 0;
    if (frame === repeat.frame && revision === repeat.revision && repeat.channels.includes(joint)) {
      x[slot] += 0.5;
      valid[slot] = 1;
    }
  }
  return { x, skip, valid, slots };
}
