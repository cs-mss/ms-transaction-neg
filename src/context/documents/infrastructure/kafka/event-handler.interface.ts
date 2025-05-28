export interface EventHandler {
  supports(event: any): boolean;
  publish(event: any);
}
